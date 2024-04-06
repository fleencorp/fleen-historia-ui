import {Component, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {Router} from "@angular/router";
import {BaseFormComponent} from "@app/base/component";
import {ChangePasswordType, VerificationType} from "@app/model/enum";
import {AuthenticationService} from "../../service";
import {isFalsy} from "@app/shared/helper";
import {ChangePasswordPayload, ForgotPasswordPayload, ResetPasswordPayload} from "@app/model/type";
import {ForgotPasswordResponse, InitiatePasswordChangeResponse} from "@app/model/response/authentication";
import {ErrorResponse, FleenResponse} from "@app/model/response";
import {codeOrOtpValidator, email, maxLength, minLength, required} from "@app/shared/validator";
import {VERIFICATION_CODE} from "@app/model/pattern";
import {faKey, faShield, IconDefinition} from "@fortawesome/free-solid-svg-icons";
import {VERIFICATION_CODE_SENT} from "@app/constant";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({ opacity: 0 })), // Initial state for entering elements
      transition('void <=> *', animate('300ms ease-in-out')), // Transition between states
    ]),
  ],
})
export class ForgotPasswordComponent extends BaseFormComponent implements OnInit {

  public emailAddress: FormControl = new FormControl<string>('');
  public verificationCode: FormControl = new FormControl<string>('');
  public changePasswordType: ChangePasswordType = ChangePasswordType.RESET;
  public isForgotEmailAddressStage: boolean = false;
  public isVerificationCodeStage: boolean = false;
  public isChangePasswordStage: boolean = false;
  public phoneNumber: string | undefined;
  protected formBuilder;

  public constructor(
      protected authenticationService: AuthenticationService,
      protected router: Router) {
    super();
  }

  ngOnInit(): void {
    this.configureValidators();
    this.isForgotEmailAddressStage = true;
  }

  protected override getRouter(): Router {
    return this.router;
  }

  /**
   * Handles the submission of a forgot password request.
   *
   * @returns {void}
   */
  public submit(): void {
    if (this.emailAddress.valid && isFalsy(this.isSubmitting)) {
      const emailAddress: string = this.emailAddress.value.toString();
      const payload: ForgotPasswordPayload = { emailAddress, verificationType: VerificationType.EMAIL };

      this.disableSubmittingAndResetErrorMessage();
      this.clearAuthTokensAndResetForm();

      this.authenticationService.forgotPassword(payload).subscribe({
        next: (result: ForgotPasswordResponse): void => { this.formCompleted((): void => this.handleForgotPasswordSuccess(result)); },
        error: (result: ErrorResponse): void => { this.handleError(result); },
        complete: (): void => { this.enableSubmitting(); },
      });
    }
  }

  public resendCode(): void {
    if (this.emailAddress.valid && isFalsy(this.isSubmitting)) {
      const emailAddress: string = this.emailAddress.value.toString();
      const payload: ForgotPasswordPayload = { emailAddress, verificationType: VerificationType.EMAIL };

      this.enableIsSendingVerificationCode();
      this.resetErrorMessage();
      this.clearMessages();

      this.authenticationService.forgotPassword(payload)
        .subscribe({
          next: (): void => { this.setStatusMessage(VERIFICATION_CODE_SENT); },
          error: (result: ErrorResponse): void => { this.handleError(result); },
          complete: (): void => { this.disableIsSendingVerificationCode(); },
      });
    }
  }

  /**
   * Clears authentication tokens and resets the form.
   *
   * @returns {void}
   * @private
   */
  private clearAuthTokensAndResetForm(): void {
    this.authenticationService.clearAuthTokens();
    this.disableSubmittingAndResetErrorMessage();
  }

  /**
   * Handles the success response from the forgot password request.
   *
   * @param {ForgotPasswordResponse} result - The response from the forgot password request.
   * @returns {void}
   * @private
   */
  private handleForgotPasswordSuccess(result: ForgotPasswordResponse): void {
    this.phoneNumber = result.phoneNumber;
    this.isVerificationCodeStage = true;
    this.isForgotEmailAddressStage = false;
    this.setStatusMessage(VERIFICATION_CODE_SENT);
  }


  /**
   * Handles the submission of an OTP (One-Time Password) for password verification.
   *
   * @returns {void}
   */
  public submitOtp(): void {
    if (this.emailAddress.valid && this.verificationCode.valid && isFalsy(this.isSubmitting)) {
      const emailAddress: string = this.getEmailAddress();
      const verificationCode: string = this.verificationCode.value;

      const payload: ResetPasswordPayload = { emailAddress, code: verificationCode };
      this.disableSubmittingAndResetErrorMessage();

      this.authenticationService.verifyResetPasswordCode(payload)
        .subscribe({
          next: (result: InitiatePasswordChangeResponse): void => { this.formCompleted((): void => this.handleVerificationSuccess(result)); },
          error: (result: ErrorResponse): void => { this.handleError(result); },
          complete: (): void => {
            this.enableSubmitting();
            this.clearMessages();
          },
      });
    }
  }

  /**
   * Handles the success response from the password verification.
   *
   * @param {InitiatePasswordChangeResponse} result - The response from the verification request.
   * @returns {void}
   * @private
   */
  private handleVerificationSuccess(result: InitiatePasswordChangeResponse): void {
    this.clearAndSaveAccessToken(result.accessToken);
    this.isChangePasswordStage = true;
    this.isVerificationCodeStage = false;
  }

  /**
   * Clears authentication tokens and saves the access token.
   *
   * @param {string} accessToken - The access token to save.
   * @returns {void}
   * @private
   */
  private clearAndSaveAccessToken(accessToken: string): void {
    this.authenticationService.clearAuthTokens();
    this.authenticationService.saveAccessToken(accessToken);
  }

  /**
   * Initiates the process of changing the user's password.
   *
   * @param {ChangePasswordPayload} payload - The payload containing information needed for the password change.
   * @returns {void}
   */
  public changePassword(payload: ChangePasswordPayload): void {
    if (isFalsy(this.isSubmitting)) {
      this.disableSubmittingAndResetErrorMessage();
      this.disableSubmitting();

      this.authenticationService.resetAndChangePassword(payload)
        .subscribe({
          next: (result: FleenResponse): void => {
            this.setStatusMessageAndClear(result.message);
            this.formCompleted((): void => { this.handlePasswordChangeCompletion(); });
          },
          error: (errorResponse: ErrorResponse): void => { this.handleError(errorResponse); },
      });
    }
  }

  /**
   * Handles the completion of the password change process.
   *
   * @returns {void}
   * @private
   */
  private handlePasswordChangeCompletion(): void {
    this.enableSubmitting();
    this.clearAuthTokensAndStartAuthentication();
  }

  /**
   * Clears authentication tokens and starts the authentication process.
   *
   * @returns {void}
   * @private
   */
  private clearAuthTokensAndStartAuthentication(): void {
    this.authenticationService.clearAuthTokens();
    this.authenticationService.startAuthentication(this.router);
  }

  /**
   * Configures validators for the email address and verification code.
   *
   * @returns {void}
   * @private
   */
  private configureValidators(): void {
    this.emailAddress.addValidators([required, email, minLength(4), maxLength(150)]);
    this.verificationCode.addValidators([required, minLength(1), maxLength(6), codeOrOtpValidator(VERIFICATION_CODE)]);
  }

  public getEmailAddress(): string {
    return this.emailAddress.value.toString();
  }

  protected readonly faKey: IconDefinition = faKey;
  protected readonly faShield = faShield;
}
