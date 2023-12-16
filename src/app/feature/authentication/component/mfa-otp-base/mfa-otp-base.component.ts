import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {Observable, of} from "rxjs";
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {BaseFormComponent} from "@app/base/component";
import {VerificationType} from "@app/model/enum";
import {codeOrOtpValidator} from "@app/shared/validator";
import {VERIFICATION_CODE} from "@app/model/pattern";
import {ErrorResponse, FleenResponse} from "@app/model/response";
import {ANY_EMPTY} from "@app/constant";
import {isFalsy} from "@app/shared/helper";
import {AuthVerificationPayload, ResendVerificationCodePayload} from "@app/model/type";

@Component({
  selector: 'app-mfa-otp-base',
  template: '',
  styles: ['']
})
export class MfaOtpBaseComponent extends BaseFormComponent implements OnInit {
  protected override formBuilder!: FormBuilder;

  public verificationMessage: string = '';
  public otp: FormControl = new FormControl<string>('');
  public verificationType: VerificationType = VerificationType.EMAIL;
  @Input('email-address') public emailAddress: string | undefined;
  @Input('phone-number') public phoneNumber: string | undefined;
  @Output() public otpSubmitted: EventEmitter<AuthVerificationPayload> = new EventEmitter<AuthVerificationPayload>();

  ngOnInit(): void {
    this.otp.addValidators([
      Validators.required, Validators.minLength(1), Validators.maxLength(6), codeOrOtpValidator(VERIFICATION_CODE)
    ]);
    this.setVerificationMessage();
  }

  protected override getRouter(): Router {
    return ANY_EMPTY;
  }

  protected serviceResendOtp(resendVerificationPayload: ResendVerificationCodePayload): Observable<any> {
    return of({})
  }

  public resendOtp(): void {
    if (isFalsy(this.isSubmitting)) {

      this.disableSubmittingAndResetErrorMessage();
      this.clearVerificationMessage();

      const verificationPayload: ResendVerificationCodePayload = this.toResendVerificationCodePayload();
      this.serviceResendOtp(verificationPayload)
        .subscribe({
          next: (): void => { this.setVerificationMessage() },
          error: (result: ErrorResponse): void => { this.handleError(result); },
          complete: (): void => { this.enableSubmitting(); }
      });
    }
  }

  public toResendVerificationCodePayload(): ResendVerificationCodePayload {
    return { verificationType: this.verificationType, emailAddress: this.emailAddress, phoneNumber: this.phoneNumber };
  }

  private clearVerificationMessage(): void {
    this.verificationMessage = '';
  }

  protected setVerificationMessage(): void { }

}
