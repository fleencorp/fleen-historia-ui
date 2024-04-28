import {Component, OnInit, ViewChild} from '@angular/core';
import {SignInBaseComponent} from "./sign-in-base-component";
import {MfaVerificationComponent, OtpVerificationComponent} from "../../component";
import {FormBuilder} from "@angular/forms";
import {AuthenticationService} from "../../service";
import {isFalsy, isTruthy} from "@app/shared/helper";
import {AuthenticationStage, AuthenticationStatus, ChangePasswordType, MfaType} from "@app/model/enum";
import {ChangePasswordComponent} from "@app/shared/component";
import {ErrorResponse} from "@app/model/response";
import {RefreshTokenResponse, SignInResponse} from "@app/model/response/authentication";
import {Router} from "@angular/router";
import {AuthTokenService, SessionStorageService} from "@app/base/service";
import {faArrowRight, faKey, faSignIn, IconDefinition} from "@fortawesome/free-solid-svg-icons";
import {OnExecuteData, ReCaptchaV3Service} from "ng-recaptcha";
import {map, Observable} from "rxjs";
import {AUTHORIZATION_BEARER, BASE_PATH, USER_DESTINATION_PAGE_KEY} from "@app/constant";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent extends SignInBaseComponent implements OnInit {

  @ViewChild(OtpVerificationComponent) otpVerificationComponent!: OtpVerificationComponent;
  @ViewChild(MfaVerificationComponent) mfaVerificationComponent!: MfaVerificationComponent;

  public mfaType: MfaType = MfaType.NONE;
  public changePasswordType: ChangePasswordType = ChangePasswordType.NONE;
  protected phoneNumber: string | undefined;
  public isVerificationStage: boolean = false;
  public isPreVerificationStage: boolean = false;
  public isMfaVerificationStage: boolean = false;
  public isOnboardingStage: boolean = false;
  public counter: number = 0;
  public token: string = ''

  constructor(
      protected authenticationService: AuthenticationService,
      protected tokenService: AuthTokenService,
      protected sessionStorageService: SessionStorageService,
      protected recaptchaService: ReCaptchaV3Service,
      protected formBuilder: FormBuilder,
      protected router: Router) {
    super();
  }

  public async ngOnInit(): Promise<void> {
    console.log('Hello World');
    this.enableLoading();
    if (isTruthy(this.getRefreshToken()) && isTruthy(this.authenticationService.isSessionExpired())) {
      console.log(this.authenticationService.isSessionExpired(), ' is the current authentication status');
      console.log('The refresh token is ', this.getRefreshToken());
/*      setTimeout(async(): Promise<void> => {
        await this.getRouter().navigate(['/']);
      }, 5000);*/
      const success: boolean = await this.refreshAuthenticationToken();
      if (success) {
        console.log('Succes');
        setTimeout(async (): Promise<void> => {
          const path: string = this.getUserDestinationPage();
          let url: string[] = [BASE_PATH];
          if (path !== BASE_PATH) {
            url = path.split('/').filter(segment => segment !== '');
          }
          console.log(url);
          await this.getRouter().navigate(url, { onSameUrlNavigation: "reload", skipLocationChange: false, replaceUrl: true });
        }, 5000);
      }
    } else {
      console.log('Got here');
      await this.continueSignIn();
      console.log('After');
    }
  }

  protected async continueSignIn(): Promise<void> {
    console.log(this.authenticationService.isAuthenticationStatusCompleted(), " is the authentication status");
    if (this.authenticationService.isAuthenticationStatusCompleted()) {
      console.log('Me Me');
      await this.goHome();
    } else {
      console.log('Him Him');
      this.authenticationService.clearAuthTokens();
    }
    this.initForm();
    this.disableLoading();
  }

  protected override getSessionStorageService(): SessionStorageService {
    return this.sessionStorageService;
  }

  protected override getFormBuilder(): FormBuilder {
    return this.formBuilder;
  }

  protected override getAuthenticationService(): AuthenticationService {
    return this.authenticationService;
  }

  protected override getOtpComponent(): OtpVerificationComponent {
    return this.otpVerificationComponent;
  }

  protected override getMfaVerificationComponent(): MfaVerificationComponent {
    return this.mfaVerificationComponent;
  }

  protected override getChangePasswordComponent(): ChangePasswordComponent | null {
    return null;
  }

  get $emailAddress(): string {
    return this.signInForm?.get('emailAddress')?.value;
  }

  get $phoneNumber(): string | undefined {
    return this?.phoneNumber;
  }

  /**
   * Initiates the sign-in process.
   *
   * Validates the sign-in form, disables submitting, and resets the error message before calling the
   * authentication service's sign-in method. Handles the success, error, and completion events of the sign-in process.
   *
   * @public
   */
  public async signIn(): Promise<void> {
    if (isFalsy(this.signInForm) || this.signInForm.invalid || isTruthy(this.isSubmitting)) {
      return;
    }
    this.disableSubmittingAndResetErrorMessage();

    const recaptchaToken: string = await this.extractRecaptchaToken('importantAction');
    this.token = recaptchaToken;

    this.authenticationService.signIn(this.signInForm.value, recaptchaToken)
      .subscribe({
        next: (result: SignInResponse): void => { this.formCompleted(() => this.handleSignInSuccess(result)); },
        error: (result: ErrorResponse): void => { this.handleError(result); },
        complete: (): void => { this.enableSubmitting(); }
    });
  }

  protected isRefreshTokenExists(): boolean {
    if (isFalsy(this.getRefreshToken())) {
      this.tokenService.clearAuthTokens();
      this.startAuthentication();
      return true;
    }
    return false;
  }

  private startAuthentication(): void {
    this.authenticationService.startAuthentication(this.router);
  }

  public async refreshAuthenticationToken(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.authenticationService.refreshToken(this.getRefreshToken())
        .subscribe({
          next: (result: RefreshTokenResponse): void => {
            console.log('The result is ', result);
            this.handleRefreshTokenResponse(result);
            this.authenticationService.clearSession();
            console.log('The user page is ', this.getSessionStorageService().getObject(USER_DESTINATION_PAGE_KEY));
            console.log('About to reach destination page');
            resolve(true); // Resolve with the result or any other value you want to return
          },
          error: (error: any): void => {
            this.tokenService.clearAuthTokens();
            this.authenticationService.clearSession();
            this.startAuthentication();
            reject(false); // Reject with the error or any other value you want to return
          }
        });
    });
  }

/*  public async refreshAuthenticationToken(): Promise<void> {
    this.authenticationService.refreshToken(this.getRefreshToken())
      .subscribe({
        next: (result: RefreshTokenResponse): void => {
          console.log('The result is ', result);
          this.handleRefreshTokenResponse(result);
          this.authenticationService.clearSession();
          console.log('The user page is ', this.getSessionStorageService().getObject(USER_DESTINATION_PAGE_KEY));
          console.log('About to reach destination page');
          setTimeout(async (): Promise<void> => {
            const path: string = this.getUserDestinationPage();
            let url: string[] = [BASE_PATH];
            if (path !== BASE_PATH) {
              url = path.split('/').filter(segment => segment !== '');
            }
            console.log(url);
            await this.getRouter().navigate(url);
          }, 5000);
          // this.gotoUserDestinationPage();
        },
        error: (): void => {
          this.tokenService.clearAuthTokens();
          this.authenticationService.clearSession();
          this.startAuthentication();
        }
    });
  }*/

  private getRefreshToken(): string {
    const refreshToken: string = this.tokenService.getAuthorizationRefreshToken();
    return isTruthy(refreshToken) ? AUTHORIZATION_BEARER.replace('{}', refreshToken) : '';
  }

  private handleRefreshTokenResponse(result: RefreshTokenResponse): void {
    this.authenticationService.setAuthToken(result);
  }


  /**
   * Handles the success of the sign-in process.
   *
   * Sets the phone number, sets the authentication token, and updates the stage based on the result's authentication status.
   *
   * @param {SignInResponse} result - The result of the sign-in process.
   * @private
   */
  private handleSignInSuccess(result: SignInResponse): void {
    this.phoneNumber = result.phoneNumber;
    this.authenticationService.setAuthToken(result);

    if (result.authenticationStatus === AuthenticationStatus.IN_PROGRESS) {
      this.isVerificationStage = true;
      this.setVerificationStage(result);
    } else if (result.authenticationStatus === AuthenticationStatus.COMPLETED) {
      this.gotoUserDestinationPage();
    }
  }

  /**
   * Sets the verification stage based on the result's next authentication stage.
   *
   * Updates stage-related properties based on the value of authenticationStage in the result.
   *
   * @param {SignInResponse} result - The result of the sign-in process.
   * @private
   */
  private setVerificationStage(result: SignInResponse): void {
    const { authenticationStage: stage, mfaType } = result;

    switch (stage) {
      case AuthenticationStage.PRE_VERIFICATION:
        this.isPreVerificationStage = true;
        break;

      case AuthenticationStage.MFA_OR_PRE_AUTHENTICATION:
        this.mfaType = mfaType;
        this.isMfaVerificationStage = true;
        break;

      case AuthenticationStage.PRE_ONBOARDED:
        this.isOnboardingStage = true;
        this.changePasswordType = ChangePasswordType.ONBOARDING;
        break;
    }
  }

  private extractRecaptchaToken(action: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      this.recaptchaService.execute(action).subscribe(() => {
        const resultObservable: Observable<OnExecuteData> = this.recaptchaService.onExecute;
        resultObservable.pipe(
          map((result: OnExecuteData) => result.token) // Extract the token from OnExecuteData
        ).subscribe({
          next: (token: string): void => {
            resolve(token); // Resolve the Promise with the token
          },
          error: (error): void => {
            reject(error); // Reject the Promise with the error
          }
        }, );
      });
    });
  }

  protected override getRouter(): Router {
    return this.router;
  }

  protected readonly faSignIn: IconDefinition = faSignIn;
  protected readonly faArrowRight = faArrowRight;
  protected readonly faKey = faKey;
}
