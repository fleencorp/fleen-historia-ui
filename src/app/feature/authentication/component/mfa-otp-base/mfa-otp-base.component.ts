import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {Observable, of} from "rxjs";
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {BaseFormComponent} from "@app/base/component";
import {VerificationType} from "@app/model/enum";
import {codeOrOtpValidator} from "@app/shared/validator";
import {VERIFICATION_CODE} from "@app/model/pattern";
import {ErrorResponse} from "@app/model/response";
import {ANY_EMPTY} from "@app/constant";
import {isFalsy} from "@app/shared/helper";
import {AuthVerificationPayload, ResendVerificationCodePayload} from "@app/model/type";


/**
 * Base component for Multi-Factor Authentication (MFA) with One-Time Password (OTP) functionality.
 * Extends the BaseFormComponent and implements OnInit.
 *
 * @author Yusuf Alamu Musa
 */
@Component({
  selector: 'app-mfa-otp-base',
  template: '',
  styles: ['']
})
export class MfaOtpBaseComponent extends BaseFormComponent implements OnInit {

  /** Override the formBuilder property from the parent class. */
  protected override formBuilder!: FormBuilder;

  /** FormControl for the OTP input field. */
  public otp: FormControl = new FormControl<string>('');

  /** The type of verification (EMAIL or PHONE). */
  public verificationType: VerificationType = VerificationType.EMAIL;

  /** Input property for the email address. */
  @Input('email-address') public emailAddress: string | undefined;

  /** Input property for the phone number. */
  @Input('phone-number') public phoneNumber: string | undefined;

  /** EventEmitter for emitting the OTP submission. */
  @Output() public otpSubmitted: EventEmitter<AuthVerificationPayload> = new EventEmitter<AuthVerificationPayload>();


  /** Lifecycle hook called after component initialization. */
  ngOnInit(): void {
    this.setVerificationMessage();
    this.configureValidators();
  }

  /**
   * Protected method to get the Router instance. Override in subclasses if needed.
   * */
  protected override getRouter(): Router {
    return ANY_EMPTY;
  }

  /**
   * Protected method for handling OTP resend.
   * Override in subclasses to provide specific service implementation.
   *
   * @param resendVerificationPayload - The payload for resending the OTP.
   * @returns An Observable for the OTP resend response.
   */
  protected serviceResendOtp(resendVerificationPayload: ResendVerificationCodePayload): Observable<any> {
    return of({});
  }

  /**
   * Resends the One-Time Password (OTP) for verification.
   * Checks if the component is currently submitting before initiating the resend process.
   * Disables submission, clears verification message, and calls the service to resend OTP.
   * Handles the response by setting a new verification message, handling errors, and enabling submission.
   */
  public resendOtp(): void {
    if (isFalsy(this.isSubmitting)) {
      this.resetErrorMessage();
      this.clearVerificationMessage();
      this.enableIsSendingVerificationCode();

      const verificationPayload: ResendVerificationCodePayload = this.toResendVerificationCodePayload();
      this.serviceResendOtp(verificationPayload)
        .subscribe({
          next: (): void => {
            this.setVerificationMessage();
            this.formCompleted();
          },
          error: (result: ErrorResponse): void => { this.handleError(result); },
          complete: (): void => {
            this.disableIsSendingVerificationCode();
          }
      });
    }
  }

  /**
   * Converts the current state to a ResendVerificationCodePayload.
   * @returns The ResendVerificationCodePayload representing the current state.
   */
  public toResendVerificationCodePayload(): ResendVerificationCodePayload {
    return { verificationType: this.verificationType, emailAddress: this.emailAddress, phoneNumber: this.phoneNumber };
  }

  /**
   * Configures validators for the OTP input field.
   * */
  private configureValidators(): void {
    this.otp.addValidators([
      Validators.required, Validators.minLength(1), Validators.maxLength(6), codeOrOtpValidator(VERIFICATION_CODE)
    ]);
  }
}

