import {Observable, of} from "rxjs";
import {MfaVerificationComponent, OtpVerificationComponent} from "../../component";
import {isFalsy, isTruthy} from "@app/shared/helper";
import {BaseFormComponent} from "@app/base/component";
import {AuthenticationService} from "../../service";
import {AuthVerificationPayload, ChangePasswordPayload} from "@app/model/type";
import {ErrorResponse} from "@app/model/response";
import {SignInUpResponse} from "@app/model/response/authentication";
import {ChangePasswordComponent} from "@app/shared/component/change-password/change-password.component";
import {USER_DESTINATION_PAGE_KEY} from "@app/constant";
import {AuthenticationStatus, AuthVerificationType, ChangePasswordType} from "@app/model/enum";
import {SessionStorageService} from "@app/base/service/storage/session-storage.service";
import {BASE_PATH} from "@app/constant/config.const";

export abstract class AuthBaseComponent extends BaseFormComponent {

  protected abstract getSessionStorageService(): SessionStorageService;

  protected abstract getAuthenticationService(): AuthenticationService;

  protected abstract getOtpComponent(): OtpVerificationComponent | null;

  protected abstract getMfaVerificationComponent(): MfaVerificationComponent | null;

  protected abstract getChangePasswordComponent(): ChangePasswordComponent | null;

  /**
   * Handles the verification code for authentication.
   *
   * This method processes the provided verification payload, including a code and type.
   * It checks if the code is truthy and submission is not in progress. If the conditions are met,
   * it disables form submission, resets error messages, and initiates the authentication process.
   *
   * @param {AuthVerificationPayload} verification - Payload with verification code and type.
   * @returns {void}
   * @memberof YourComponent
   */
  public handleVerificationCode(verification: AuthVerificationPayload): void {
    const { code, type } = verification;

    if (isTruthy(code) && isFalsy(this.isSubmitting)) {
      this.disableSubmittingAndResetErrorMessage();
      this.resetHandleVerificationCodeErrorMessage(type);

      this.completeSignUpOrValidateMfaOrOnboarding(verification)
        .subscribe({
          next: (result: SignInUpResponse): void => this.handleVerificationSuccess(result),
          error: (error: ErrorResponse): void => this.handleVerificationError(type, error?.message),
          complete: (): void => this.enableSubmitting()
        });
    }
  }


  /**
   * Handles successful authentication verification.
   *
   * Sets the authentication token and navigates to the user destination page if authentication is completed.
   *
   * @param {SignInUpResponse} result - Authentication response.
   * @returns {void}
   * @private
   * @memberof YourComponent
   */
  private handleVerificationSuccess(result: SignInUpResponse): void {
    this.getAuthenticationService().setAuthToken(result);

    if (result.authenticationStatus === AuthenticationStatus.COMPLETED) {
      this.gotoUserDestinationPage();
    }
  }

  /**
   * Handles authentication verification error.
   *
   * Sets the verification code error message, then enables form submission.
   *
   * @param {AuthVerificationType} type - Type of authentication verification.
   * @param {string} errorMessage - Error message to display.
   * @returns {void}
   * @private
   * @memberof YourComponent
   */
  private handleVerificationError(type: AuthVerificationType, errorMessage: string): void {
    this.setHandleVerificationCodeErrorMessage(type, errorMessage);
    this.enableSubmitting();
  }


  /**
   * Initiates the password change process.
   *
   * If no submission is in progress, it disables form submission, resets error messages, and triggers the password change.
   * Handles the success and error scenarios of the password change operation.
   *
   * @param {ChangePasswordPayload} payload - Payload containing information for the password change.
   * @returns {void}
   * @memberof YourComponent
   */
  public changePassword(payload: ChangePasswordPayload): void {
    if (isTruthy(this.isSubmitting)) {
      return;
    }

    this.disableSubmittingAndResetErrorMessage();

    this.completeChangePassword(payload)
      .subscribe({
        next: (result: SignInUpResponse): void => this.handlePasswordChangeSuccess(result),
        error: (error: ErrorResponse): void => this.handlePasswordChangeError(error),
        complete: (): void => this.enableSubmitting()
      });
  }

  /**
   * Handles successful password change.
   *
   * Sets the authentication token and navigates to the user destination page if authentication is completed.
   *
   * @param {SignInUpResponse} result - Authentication response.
   * @returns {void}
   * @private
   * @memberof YourComponent
   */
  private handlePasswordChangeSuccess(result: SignInUpResponse): void {
    this.getAuthenticationService().setAuthToken(result);

    if (result.authenticationStatus === AuthenticationStatus.COMPLETED) {
      this.gotoUserDestinationPage();
    }
  }

  /**
   * Handles password change error.
   *
   * Displays the error message in the ChangePasswordComponent, if available, and enables form submission.
   *
   * @param {ErrorResponse} error - Error response.
   * @returns {void}
   * @private
   * @memberof YourComponent
   */
  private handlePasswordChangeError(error: ErrorResponse): void {
    const changePasswordComponent: ChangePasswordComponent | null = this.getChangePasswordComponent();

    if (isTruthy(changePasswordComponent)) {
      changePasswordComponent?.setErrorMessage(error.message);
    }

    this.enableSubmitting();
  }


  /**
   * Completes the authentication process based on the verification type.
   *
   * Validates MFA (Multi-Factor Authentication) or completes the sign-up process as per the provided verification payload.
   * Returns an observable with the authentication result.
   *
   * @param {AuthVerificationPayload} verification - Verification payload.
   * @returns {Observable<any>} Observable with the authentication result.
   * @protected
   * @memberof YourComponent
   */
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

  /**
   * Completes the password change process based on the change type.
   *
   * Completes onboarding or performs other necessary actions based on the provided change password payload.
   * Returns an observable with the password change result.
   *
   * @param {ChangePasswordPayload} payload - Change password payload.
   * @returns {Observable<any>} Observable with the password change result.
   * @protected
   * @memberof YourComponent
   */
  protected completeChangePassword(payload: ChangePasswordPayload): Observable<any> {
    const { type } = payload;

    switch (type) {
      case ChangePasswordType.ONBOARDING:
        return this.getAuthenticationService().completeOnboarding(payload);
      default:
        return of({});
    }
  }

  /**
   * Resets error messages related to verification code handling based on the verification type.
   *
   * Resets error messages in the OtpVerificationComponent or MfaVerificationComponent if available.
   *
   * @param {AuthVerificationType} type - Verification type.
   * @returns {void}
   * @protected
   * @memberof YourComponent
   */
  protected resetHandleVerificationCodeErrorMessage(type: AuthVerificationType): void {
    const otpComponent: OtpVerificationComponent | null = this.getOtpComponent();
    const mfaComponent: MfaVerificationComponent | null = this.getMfaVerificationComponent();

    if ((type === AuthVerificationType.VERIFICATION && isTruthy(otpComponent)) ||
      (type === AuthVerificationType.MFA && isTruthy(mfaComponent))) {
      otpComponent?.resetErrorMessage();
      mfaComponent?.resetErrorMessage();
    }
  }

  /**
   * Sets an error message for verification code handling based on the verification type.
   *
   * Sets the error message in the OtpVerificationComponent or MfaVerificationComponent if available.
   *
   * @param {AuthVerificationType} type - Verification type.
   * @param {string} message - Error message to set.
   * @returns {void}
   * @protected
   * @memberof YourComponent
   */
  protected setHandleVerificationCodeErrorMessage(type: AuthVerificationType, message: string): void {
    const otpComponent: OtpVerificationComponent | null = this.getOtpComponent();
    const mfaComponent: MfaVerificationComponent | null = this.getMfaVerificationComponent();

    if ((type === AuthVerificationType.VERIFICATION && isTruthy(otpComponent)) ||
      (type === AuthVerificationType.MFA && isTruthy(mfaComponent))) {
      otpComponent?.setErrorMessage(message);
      mfaComponent?.setErrorMessage(message);
    }
  }

  /**
   * Navigates to the user's destination page.
   *
   * Retrieves the destination page from session storage or defaults to the base path.
   * Uses Angular Router to navigate to the destination page.
   *
   * @returns {void}
   * @protected
   * @memberof YourComponent
   */
  protected gotoUserDestinationPage(): void {
    this.getRouter().navigateByUrl(this.getUserDestinationPage())
      .then((m: boolean) => m);
  }

  /**
   * Gets the user's destination page.
   *
   * Retrieves the destination page from session storage or defaults to the base path.
   *
   * @returns {string} User's destination page.
   * @private
   * @memberof YourComponent
   */
  private getUserDestinationPage(): string {
    return this.getSessionStorageService().getObject(USER_DESTINATION_PAGE_KEY) || BASE_PATH;
  }

}
