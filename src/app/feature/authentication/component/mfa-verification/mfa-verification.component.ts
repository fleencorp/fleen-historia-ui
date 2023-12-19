import {Component, Input} from '@angular/core';
import {MfaOtpBaseComponent} from "@app/feature/authentication/component";
import {Observable} from "rxjs";
import {AuthVerificationType, MfaType} from "@app/model/enum";
import {AuthenticationService} from "@app/feature/authentication/service";
import {ResendVerificationCodePayload} from "@app/model/type";
import {FleenResponse} from "@app/model/response";

/**
 * Component for Multi-Factor Authentication (MFA) verification, extending the base component for MFA OTP functionality.
 *
 * @author Yusuf Alamu Musa
 */
@Component({
  selector: 'app-mfa-verification',
  templateUrl: './mfa-verification.component.html',
  styleUrls: ['./mfa-verification.component.css']
})
export class MfaVerificationComponent extends MfaOtpBaseComponent  {

  /**
   * Input property for the MFA type, indicating the specific MFA method (PHONE, EMAIL, AUTHENTICATOR, NONE).
   */
  @Input('mfa-type') public mfaType: MfaType = MfaType.NONE;

  /**
   * Constructs an instance of MfaVerificationComponent.
   * @param authenticationService - The AuthenticationService for handling authentication-related operations.
   */
  public constructor(private authenticationService: AuthenticationService) {
    super();
  }

  /**
   * Handles the submission of the MFA verification form. Emits the MFA code if valid.
   * @param event - The event triggering the submission.
   */
  public submit(event: Event): void {
    this.stopEvent(event);

    if (this.otp.valid) {
      const code: string = this.otp.value.toString();
      this.otpSubmitted.emit({
        code,
        mfaType: this.mfaType,
        type: AuthVerificationType.MFA });
      this.clearVerificationMessage();
    }
  }

  /**
   * Overrides the base component method to set a custom verification message based on the MFA type.
   */
  protected override setVerificationMessage(): void {
    let verificationMessage: string;

    if (this.mfaType === MfaType.AUTHENTICATOR) {
      verificationMessage = 'Use an authenticator code to complete the process';
    } else {
      const contactInfo: string | undefined =
        this.mfaType === MfaType.EMAIL ? this.emailAddress : this.phoneNumber;

      verificationMessage = `Code has been sent to your ${this.getTypeLabel()} ${contactInfo}`;
    }

    this.verificationMessage = verificationMessage;
  }

  /**
   * Gets the label for the current MFA type.
   * @returns The label for the current MFA type.
   */
  private getTypeLabel(): string {
    return this.mfaType === MfaType.EMAIL ? 'email address' : 'phone number';
  }

  /**
   * Determines whether the code can be resent, excluding authenticator method.
   */
  get canResendCode(): boolean {
    return this.mfaType !== MfaType.AUTHENTICATOR;
  }

  /**
   * Overrides the base component method to handle service-specific OTP resend.
   * @param resendVerificationPayload - The payload for resending the OTP.
   * @returns An Observable of FleenResponse.
   */
  override serviceResendOtp(resendVerificationPayload: ResendVerificationCodePayload): Observable<FleenResponse> {
    return this.authenticationService.resendPreAuthenticationOtp(resendVerificationPayload);
  }

}
