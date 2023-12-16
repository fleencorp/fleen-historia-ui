import {Component} from '@angular/core';
import {MfaOtpBaseComponent} from "../../component";
import {Observable} from "rxjs";
import {ResendVerificationCodePayload} from "@app/model/type";
import {AuthenticationService} from "../../service";
import {AuthVerificationType, VerificationType} from "@app/model/enum";
import {FleenResponse} from "@app/model/response";

@Component({
  selector: 'app-otp-verification',
  templateUrl: './otp-verification.component.html',
  styleUrls: ['./otp-verification.component.css']
})
export class OtpVerificationComponent extends MfaOtpBaseComponent {

  public constructor(private authenticationService: AuthenticationService) {
    super();
  }

  public submit(event: Event): void {
    this.stopEvent(event);
    if (this.otp.valid) {
      const code: string = this.otp.value.toString();
      this.otpSubmitted.emit({code, verificationType: this.verificationType, type: AuthVerificationType.VERIFICATION });
    }
  }

  public tryAnotherMethod(event: Event): void {
    this.stopEvent(event);
    this.verificationType = this.verificationType !== VerificationType.EMAIL
      ? VerificationType.EMAIL
      : VerificationType.PHONE;
    this.resendOtp();
  }

  protected override setVerificationMessage(): void {
    let verificationMessage: string = 'Code has been sent to your '

    this.verificationMessage = this.verificationType === VerificationType.EMAIL
      ? verificationMessage.concat(`email address ${this.emailAddress}`)
      : verificationMessage.concat(`phone number ${this.phoneNumber}`);
  }

  override serviceResendOtp(resendVerificationPayload: ResendVerificationCodePayload): Observable<FleenResponse> {
    return this.authenticationService.resendOtp(resendVerificationPayload);
  }

}
