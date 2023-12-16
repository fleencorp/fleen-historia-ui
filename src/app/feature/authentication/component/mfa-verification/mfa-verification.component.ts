import {Component, Input} from '@angular/core';
import {MfaOtpBaseComponent} from "../mfa-otp-base/mfa-otp-base.component";
import {Observable} from "rxjs";
import {AuthVerificationType, MfaType} from "@app/model/enum";
import {AuthenticationService} from "../../service/authentication.service";
import {ResendVerificationCodePayload} from "@app/model/type";
import {FleenResponse} from "@app/model/response";

@Component({
  selector: 'app-mfa-verification',
  templateUrl: './mfa-verification.component.html',
  styleUrls: ['./mfa-verification.component.css']
})
export class MfaVerificationComponent extends MfaOtpBaseComponent  {

  @Input('mfa-type') public mfaType: MfaType = MfaType.NONE;

  public constructor(private authenticationService: AuthenticationService) {
    super();
  }

  public submit(event: Event): void {
    this.stopEvent(event);
    if (this.otp.valid) {
      const code: string = this.otp.value.toString();
      this.otpSubmitted.emit({code, mfaType: this.mfaType, type: AuthVerificationType.MFA });
    }
  }

  protected override setVerificationMessage(): void {
    let verificationMessage: string = this.mfaType === MfaType.AUTHENTICATOR
      ? 'Use an authenticator code to complete the process'
      : 'Code has been sent to your ';

    this.verificationMessage = this.mfaType === MfaType.EMAIL
      ? verificationMessage.concat(`email address ${this.emailAddress}`)
      : verificationMessage.concat(`phone number ${this.phoneNumber}`);
  }

  get canResendCode(): boolean {
    return this.mfaType !== MfaType.AUTHENTICATOR;
  }

  override serviceResendOtp(resendVerificationPayload: ResendVerificationCodePayload): Observable<FleenResponse> {
    return this.authenticationService.resendPreAuthenticationOtp(resendVerificationPayload);
  }

}
