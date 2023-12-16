import {Observable, of} from "rxjs";
import {OtpVerificationComponent} from "../otp-verification/otp-verification.component";
import {MfaVerificationComponent} from "../mfa-verification/mfa-verification.component";
import {isFalsy, isTruthy, nonNull} from "@app/shared/helper";
import {BaseFormComponent} from "@app/base/component";
import {AuthenticationService} from "../../service/authentication.service";
import {AuthVerificationPayload, ChangePasswordPayload} from "@app/model/type";
import {ErrorResponse} from "@app/model/response";
import {SignInUpResponse} from "@app/model/response/authentication";
import {ChangePasswordComponent} from "@app/shared/component/change-password/change-password.component";
import {USER_DESTINATION_PAGE_KEY} from "@app/constant";
import {AuthenticationStatus, AuthVerificationType, ChangePasswordType} from "@app/model/enum";
import {SessionStorageService} from "@app/base/service/session-storage.service";
import {BASE_PATH} from "@app/constant/config.const";

export abstract class AuthBaseComponent extends BaseFormComponent {

  protected abstract getSessionStorageService(): SessionStorageService;

  protected abstract getAuthenticationService(): AuthenticationService;

  protected abstract getOtpComponent(): OtpVerificationComponent | null;

  protected abstract getMfaVerificationComponent(): MfaVerificationComponent | null;

  protected abstract getChangePasswordComponent(): ChangePasswordComponent | null;

  public handleVerificationCode(verification: AuthVerificationPayload): void {
    const { code, type } = verification;

    if (isTruthy(code) && isFalsy(this.isSubmitting)) {
      this.disableSubmittingAndResetErrorMessage();
      this.resetHandleVerificationCodeErrorMessage(type);

      this.completeSignUpOrValidateMfaOrOnboarding(verification)
        .subscribe({
          next: (result: SignInUpResponse): void => { this.handleVerificationSuccess(result); },
          error: (error: ErrorResponse): void => { this.handleVerificationError(type, error?.message) },
          complete: (): void => { this.enableSubmitting(); }
      });
    }
  }

  private handleVerificationSuccess(result: SignInUpResponse): void {
    this.getAuthenticationService().setAuthToken(result);

    if (result.authenticationStatus === AuthenticationStatus.COMPLETED) {
      this.gotoUserDestinationPage();
    }
  }

  private handleVerificationError(type: AuthVerificationType, errorMessage: string): void {
    this.setHandleVerificationCodeErrorMessage(type, errorMessage);
    this.enableSubmitting();
  }

  public changePassword(payload: ChangePasswordPayload): void {
    if (isTruthy(this.isSubmitting)) {
      return;
    }

    this.disableSubmittingAndResetErrorMessage();

    this.completeChangePassword(payload)
      .subscribe({
        next: (result: SignInUpResponse): void => { this.handlePasswordChangeSuccess(result); },
        error: (error: ErrorResponse): void => { this.handlePasswordChangeError(error); },
        complete: (): void => { this.enableSubmitting(); }
    });
  }

  private handlePasswordChangeSuccess(result: SignInUpResponse): void {
    this.getAuthenticationService().setAuthToken(result);

    if (result.authenticationStatus === AuthenticationStatus.COMPLETED) {
      this.gotoUserDestinationPage();
    }
  }

  private handlePasswordChangeError(error: ErrorResponse): void {
    const changePasswordComponent: ChangePasswordComponent | null = this.getChangePasswordComponent();

    if (isTruthy(changePasswordComponent)) {
      changePasswordComponent?.setErrorMessage(error.message);
    }

    this.enableSubmitting();
  }

  protected completeSignUpOrValidateMfaOrOnboarding(verification: AuthVerificationPayload): Observable<any> {
    const { type } = verification;

    switch (type) {
      case AuthVerificationType.MFA:
        return this.getAuthenticationService().validateSignInMfa(verification);
      case AuthVerificationType.VERIFICATION:
        return this.getAuthenticationService().completeSignUp(verification);
      default:
        return of({});
    }
  }

  protected completeChangePassword(payload: ChangePasswordPayload): Observable<any> {
    const { type } = payload;

    switch (type) {
      case ChangePasswordType.ONBOARDING:
        return this.getAuthenticationService().completeOnboarding(payload);
      default:
        return of({});
    }
  }

  protected resetHandleVerificationCodeErrorMessage(type: AuthVerificationType): void {
    const otpComponent: OtpVerificationComponent | null = this.getOtpComponent();
    const mfaComponent: MfaVerificationComponent | null = this.getMfaVerificationComponent();

    if ((type === AuthVerificationType.VERIFICATION && isTruthy(otpComponent)) ||
        (type === AuthVerificationType.MFA && isTruthy(mfaComponent))) {
      otpComponent?.resetErrorMessage();
      mfaComponent?.resetErrorMessage();
    }
  }

  protected setHandleVerificationCodeErrorMessage(type: AuthVerificationType, message: string): void {
    const otpComponent: OtpVerificationComponent | null = this.getOtpComponent();
    const mfaComponent: MfaVerificationComponent | null = this.getMfaVerificationComponent();

    if ((type === AuthVerificationType.VERIFICATION && (isTruthy(otpComponent))) ||
        (type === AuthVerificationType.MFA && isTruthy(mfaComponent))) {
      otpComponent?.setErrorMessage(message);
      mfaComponent?.setErrorMessage(message);
    }
  }


  protected gotoUserDestinationPage(): void {
    this.getRouter().navigateByUrl(this.getUserDestinationPage())
      .then((m: boolean) => m);
  }

  private getUserDestinationPage(): string {
    return this.getSessionStorageService().getObject(USER_DESTINATION_PAGE_KEY) || BASE_PATH;
  }
}
