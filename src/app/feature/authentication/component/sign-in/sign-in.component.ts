import {Component, OnInit, ViewChild} from '@angular/core';
import {SignInBaseComponent} from "./sign-in-base-component";
import {MfaVerificationComponent, OtpVerificationComponent} from "../../component";
import {FormBuilder} from "@angular/forms";
import {AuthenticationService} from "../../service";
import {isFalsy, isTruthy} from "@app/shared/helper";
import {AuthenticationStatus, ChangePasswordType, MfaType, NextAuthentication} from "@app/model/enum";
import {ChangePasswordComponent} from "@app/shared/component/change-password/change-password.component";
import {ErrorResponse} from "@app/model/response";
import {SignInResponse} from "@app/model/response/authentication";
import {Router} from "@angular/router";
import {SessionStorageService} from "@app/base/service";

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

  constructor(protected authenticationService: AuthenticationService,
              protected sessionStorageService: SessionStorageService,
              protected formBuilder: FormBuilder,
              protected router: Router) {
    super();
  }

  public async ngOnInit(): Promise<void> {
    if (this.authenticationService.isAuthenticationStatusCompleted()) {
      await this.goHome();
    } else {
      this.authenticationService.clearAuthTokens();
    }
    this.initForm();
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

  public signIn(): void {
    if (isFalsy(this.signInForm) && this.signInForm.invalid && isFalsy(this.isSubmitting)) {
      return;
    }

    this.disableSubmittingAndResetErrorMessage();

    this.authenticationService.signIn(this.signInForm.value)
      .subscribe({
        next: (result: SignInResponse): void => { this.handleSignInSuccess(result); },
        error: (result: ErrorResponse): void => { this.handleError(result); },
        complete: (): void => { this.enableSubmitting(); }
      });
  }

  private handleSignInSuccess(result: SignInResponse): void {
    this.phoneNumber = result.phoneNumber;
    this.authenticationService.setAuthToken(result);

    if (result.authenticationStatus === AuthenticationStatus.IN_PROGRESS) {
      this.isVerificationStage = true;
      this.setVerificationStage(result);
    }

    if (result.authenticationStatus === AuthenticationStatus.COMPLETED) {
      this.gotoUserDestinationPage();
    }
  }

  get $emailAddress(): string {
    return this.signInForm?.get('emailAddress')?.value;
  }

  get $phoneNumber(): string | undefined {
    return this?.phoneNumber;
  }

  private setVerificationStage(result: SignInResponse): void {
    const { nextAuthentication: stage, mfaType } = result;

    switch (stage) {
      case NextAuthentication.PRE_VERIFICATION:
        this.isPreVerificationStage = true;
        break;

      case NextAuthentication.MFA_OR_PRE_AUTHENTICATION:
        this.mfaType = mfaType;
        this.isMfaVerificationStage = true;
        break;

      case NextAuthentication.PRE_ONBOARDED:
        this.isOnboardingStage = true;
        this.changePasswordType = ChangePasswordType.ONBOARDING;
        break;
    }
  }

  protected override getRouter(): Router {
    return this.router;
  }
}
