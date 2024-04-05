import {Component} from '@angular/core';
import {MfaOtpBaseComponent} from "../../component";
import {Observable} from "rxjs";
import {ResendVerificationCodePayload} from "@app/model/type";
import {AuthenticationService} from "../../service";
import {AuthVerificationType, VerificationType} from "@app/model/enum";
import {FleenResponse} from "@app/model/response";
import {isTruthy} from "@app/shared/helper";
import {faShield} from "@fortawesome/free-solid-svg-icons";

/**
 * Component for OTP verification, extending the base component for MFA OTP functionality.
 *
 * @author Yusuf Alamu Musa
 */
@Component({
  selector: 'app-otp-verification',
  templateUrl: './otp-verification.component.html',
  styleUrls: ['./otp-verification.component.css']
})
export class OtpVerificationComponent extends MfaOtpBaseComponent {

  /**
   * Constructs an instance of OtpVerificationComponent.
   * @param authenticationService - The AuthenticationService for handling authentication-related operations.
   */
  public constructor(private authenticationService: AuthenticationService) {
    super();
  }

  public override ngOnInit() {
    super.ngOnInit();
  }

  /**
   * Handles the submission of the OTP form. Emits the OTP code if valid.
   */
  public submit(): void {

    if (isTruthy(this.otp) && this.otp.valid) {
      const code: string = this.otp.value.toString();
      this.otpSubmitted.emit({
        code,
        verificationType: this.verificationType,
        type: AuthVerificationType.VERIFICATION
      });
    }
  }

  /**
   * Switches to another verification method and resends OTP.
   */
  public tryAnotherMethod(): void {

    this.verificationType = this.toggleVerificationType(this.verificationType);
    this.resendOtp();
  }

  /**
   * Toggles between email and phone verification types.
   * @param currentType - The current verification type.
   * @returns The toggled verification type.
   */
  private toggleVerificationType(currentType: VerificationType): VerificationType {
    return currentType !== VerificationType.EMAIL ? VerificationType.EMAIL : VerificationType.PHONE;
  }

  /**
   * Sets the verification message based on the current verification type and contact information.
   */
  protected override setVerificationMessage(): void {
    const contactInfo: string | undefined =
      this.verificationType === VerificationType.EMAIL ? this.emailAddress : this.phoneNumber;

    this.verificationMessage = `Code has been sent to your ${this.getTypeLabel()} ${contactInfo}`;
  }

  /**
   * Gets the label for the current verification type.
   * @returns The label for the current verification type.
   */
  private getTypeLabel(): string {
    return this.verificationType === VerificationType.EMAIL ? 'email address' : 'phone number';
  }

  /**
   * Overrides the base component method to handle service-specific OTP resend.
   * @param resendVerificationPayload - The payload for resending the OTP.
   * @returns An Observable of FleenResponse.
   */
  override serviceResendOtp(resendVerificationPayload: ResendVerificationCodePayload): Observable<FleenResponse> {
    return this.authenticationService.resendOtp(resendVerificationPayload);
  }

  protected readonly faShield = faShield;
}
