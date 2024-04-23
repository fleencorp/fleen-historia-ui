import {Component, OnInit, ViewChild} from '@angular/core';
import {SignInBaseComponent} from "./sign-in-base-component";
import {MfaVerificationComponent, OtpVerificationComponent} from "../../component";
import {FormBuilder} from "@angular/forms";
import {AuthenticationService} from "../../service";
import {isFalsy, isTruthy} from "@app/shared/helper";
import {AuthenticationStage, AuthenticationStatus, ChangePasswordType, MfaType} from "@app/model/enum";
import {ChangePasswordComponent} from "@app/shared/component";
import {ErrorResponse} from "@app/model/response";
import {SignInResponse} from "@app/model/response/authentication";
import {Router} from "@angular/router";
import {SessionStorageService} from "@app/base/service";
import {faArrowRight, faKey, faSignIn, IconDefinition} from "@fortawesome/free-solid-svg-icons";
import {OnExecuteData, ReCaptchaV3Service} from "ng-recaptcha";
import {map, Observable} from "rxjs";

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

  constructor(
      protected authenticationService: AuthenticationService,
      protected sessionStorageService: SessionStorageService,
      protected recaptchaService: ReCaptchaV3Service,
      protected formBuilder: FormBuilder,
      protected router: Router) {
    super();
  }

  public async ngOnInit(): Promise<void> {
    this.enableLoading();
    if (this.authenticationService.isAuthenticationStatusCompleted()) {
      await this.goHome();
    } else {
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

    this.authenticationService.signIn(this.signInForm.value, recaptchaToken)
      .subscribe({
        next: (result: SignInResponse): void => { this.formCompleted(() => this.handleSignInSuccess(result)); },
        error: (result: ErrorResponse): void => { this.handleError(result); },
        complete: (): void => { this.enableSubmitting(); }
    });
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
