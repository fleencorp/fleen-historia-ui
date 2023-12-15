import {Observable, of} from "rxjs";
import {OtpVerificationComponent} from "../otp-verification/otp-verification.component";
import {MfaVerificationComponent} from "../mfa-verification/mfa-verification.component";
import {isFalsy, isTruthy} from "@app/shared/helper";
import {BaseFormComponent} from "@app/base/component";
import {AuthenticationService} from "../../../service/authentication.service";
import {AuthVerificationPayload, ChangePasswordPayload} from "@app/model/type";
import {ErrorResponse} from "@app/model/response";
import {SignInUpResponse} from "@app/model/response/authentication";
import {ChangePasswordComponent} from "@app/shared/component/change-password/change-password.component";
import {USER_DESTINATION_PAGE_KEY} from "@app/constant";
import {AuthenticationStatus, AuthVerificationType, ChangePasswordType} from "@app/model/enum";
import {SessionStorageService} from "@app/base/service/session-storage.service";

export abstract class AuthBaseComponent extends BaseFormComponent {

  protected abstract getSessionStorageService(): SessionStorageService;

  abstract getAuthenticationService(): AuthenticationService;

  abstract getOtpComponent(): OtpVerificationComponent | null;

  abstract getMfaVerificationComponent(): MfaVerificationComponent | null;

  abstract getChangePasswordComponent(): ChangePasswordComponent | null;

  public handleVerificationCode(verification: AuthVerificationPayload): void {
    if (isTruthy(verification.code) && isFalsy(this.isSubmitting)) {
      const { type } = verification;
      this.disableSubmittingAndResetErrorMessage();
      this.resetHandleVerificationCodeErrorMessage(type);

      this.completeSignUpOrValidateMfaOrOnboarding(verification)
        .subscribe({
          next: (result: SignInUpResponse): void => {
            this.getAuthenticationService().setAuthToken(result);
            if (result.authenticationStatus === AuthenticationStatus.COMPLETED) {
              this.gotoUserDestinationPage();
            }
          },
          error: (error: ErrorResponse): void => {
            this.setHandleVerificationCodeErrorMessage(type, error.message);
            this.enableSubmitting();
          },
          complete: (): void => {
            this.enableSubmitting();
          }
      });
    }
  }

  public changePassword(payload: ChangePasswordPayload): void {
    if (isFalsy(this.isSubmitting)) {
      this.disableSubmittingAndResetErrorMessage();

      this.completeChangePassword(payload)
        .subscribe({
          next: (result: SignInUpResponse): void => {
            this.getAuthenticationService().setAuthToken(result);
            if (result.authenticationStatus === AuthenticationStatus.COMPLETED) {
              this.gotoUserDestinationPage();
            }
          },
          error: (error: ErrorResponse): void => {
            if (isTruthy(this.getChangePasswordComponent())) {
              this.getChangePasswordComponent()?.setErrorMessage(error.message);
            }
            this.enableSubmitting();
          },
          complete: (): void => {
            this.enableSubmitting();
          }
      });
    }
  }

  protected completeSignUpOrValidateMfaOrOnboarding(verification: AuthVerificationPayload): Observable<any> {
    const { type } = verification;
    if (type === AuthVerificationType.MFA) {
      return this.getAuthenticationService().validateSignInMfa(verification);
    } else if (type === AuthVerificationType.VERIFICATION) {
      return this.getAuthenticationService().completeSignUp(verification);
    } else {
      return of({});
    }
  }

  protected completeChangePassword(payload: ChangePasswordPayload): Observable<any> {
    const { type } = payload;
    if (type === ChangePasswordType.ONBOARDING) {
      return this.getAuthenticationService().completeOnboarding(payload);
    } else {
      return of({});
    }
  }

  protected resetHandleVerificationCodeErrorMessage(type: AuthVerificationType): void {
    if (isTruthy(this.getOtpComponent()) || isTruthy(this.getMfaVerificationComponent())) {
      if (type === AuthVerificationType.VERIFICATION) {
        this.getOtpComponent()?.resetErrorMessage();
      } else if (type === AuthVerificationType.MFA) {
        this.getMfaVerificationComponent()?.resetErrorMessage();
      }
    }
  }

  protected setHandleVerificationCodeErrorMessage(type: AuthVerificationType, message: string): void {
    if (isTruthy(this.getOtpComponent()) || isTruthy(this.getMfaVerificationComponent())) {
      if (type === AuthVerificationType.VERIFICATION) {
        this.getOtpComponent()?.setErrorMessage(message);
      } else if (type === AuthVerificationType.MFA) {
        this.getMfaVerificationComponent()?.setErrorMessage(message);
      }
    }
  }

  protected gotoUserDestinationPage(): void {
    this.getRouter().navigateByUrl(this.getUserDestinationPage())
      .then((m: boolean) => m);
  }

  private getUserDestinationPage(): string {
    return this.getSessionStorageService().getObject(USER_DESTINATION_PAGE_KEY) || '';
  }
}
