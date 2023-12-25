import {Component, OnInit} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {Router} from "@angular/router";
import {BaseFormComponent} from "@app/base/component";
import {ChangePasswordType, VerificationType} from "@app/model/enum";
import {AuthenticationService} from "../../service";
import {isFalsy} from "@app/shared/helper";
import {ChangePasswordPayload, ForgotPasswordPayload, ResetPasswordPayload} from "@app/model/type";
import {ForgotPasswordResponse, InitiatePasswordChangeResponse} from "@app/model/response/authentication";
import {ErrorResponse} from "@app/model/response";
import {codeOrOtpValidator} from "@app/shared/validator";
import {VERIFICATION_CODE} from "@app/model/pattern";

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
  public isDetailValid: boolean = false;
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
  }

  protected override getRouter(): Router {
    return this.router;
  }

  /**
   * Handles the submission of a forgot password request.
   *
   * @param {Event} event - The event triggering the submission.
   * @returns {void}
   */
  public submit(event: Event): void {
    this.stopEvent(event);

    if (this.emailAddress.valid && isFalsy(this.isSubmitting)) {
      const emailAddress: string = this.emailAddress.value.toString();
      const payload: ForgotPasswordPayload = { emailAddress, verificationType: VerificationType.EMAIL };

      this.clearAuthTokensAndResetForm();

      this.authenticationService.forgotPassword(payload).subscribe({
        next: (result: ForgotPasswordResponse): void => { this.handleForgotPasswordSuccess(result); },
        error: (result: ErrorResponse): void => { this.handleError(result); },
        complete: (): void => { this.enableSubmitting(); },
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
    this.isDetailValid = true;
  }


  /**
   * Handles the submission of an OTP (One-Time Password) for password verification.
   *
   * @param {Event} event - The event triggering the submission.
   * @returns {void}
   */
  public submitOtp(event: Event): void {
    this.stopEvent(event);

    if (this.emailAddress.valid && this.verificationCode.valid && isFalsy(this.isSubmitting)) {
      const emailAddress: string = this.emailAddress.value.toString();
      const verificationCode: string = this.verificationCode.value;

      const payload: ResetPasswordPayload = { emailAddress, code: verificationCode };
      this.disableSubmittingAndResetErrorMessage();

      this.authenticationService.verifyResetPasswordCode(payload).subscribe({
        next: (result: InitiatePasswordChangeResponse): void => { this.handleVerificationSuccess(result); },
        error: (result: ErrorResponse): void => { this.handleError(result); },
        complete: (): void => { this.enableSubmitting(); },
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

      this.authenticationService.resetAndChangePassword(payload).subscribe({
        error: (errorResponse: ErrorResponse): void => { this.handleError(errorResponse); },
        complete: (): void => { this.handlePasswordChangeCompletion(); },
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
    this.emailAddress.addValidators([
      Validators.required, Validators.email, Validators.minLength(4), Validators.maxLength(150)
    ]);

    this.verificationCode.addValidators([
      Validators.required, Validators.minLength(1), Validators.maxLength(6), codeOrOtpValidator(VERIFICATION_CODE)
    ]);
  }


}
