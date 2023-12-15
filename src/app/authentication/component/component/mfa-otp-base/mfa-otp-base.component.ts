import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {Observable, of} from "rxjs";
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {BaseFormComponent} from "../../../../base/component";
import {VerificationType} from "../../../../model/enum";
import {codeOrOtpValidator} from "../../../../shared/validator";
import {VERIFICATION_CODE} from "../../../../model/pattern";
import {ErrorResponse} from "../../../../model/response";
import {ANY_EMPTY} from "../../../../constant";
import {isFalsy} from "../../../../shared/helper";
import {AuthVerificationPayload, ResendVerificationCodePayload} from "../../../../model/type";

@Component({
  selector: 'app-mfa-otp-base',
  template: '',
  styles: ['']
})
export class MfaOtpBaseComponent extends BaseFormComponent implements OnInit {
  protected override formBuilder!: FormBuilder;

  public otp: FormControl = new FormControl<string>('');
  public verificationType: VerificationType = VerificationType.EMAIL;
  @Input('email-address') public emailAddress: string | undefined;
  @Input('phone-number') public phoneNumber: string | undefined;
  @Output() public otpSubmitted: EventEmitter<AuthVerificationPayload> = new EventEmitter<AuthVerificationPayload>();

  ngOnInit(): void {
    this.otp.addValidators([
      Validators.required, Validators.minLength(1), Validators.maxLength(6), codeOrOtpValidator(VERIFICATION_CODE)
    ]);
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

      const verificationPayload: ResendVerificationCodePayload = this.toResendVerificationCodePayload();
      this.serviceResendOtp(verificationPayload)
        .subscribe({
          error: (result: ErrorResponse): void => {
            this.handleError(result);
          },
          complete: (): void => {
            this.enableSubmitting();
          }
      });
    }
  }

  public setErrorMessage(errorMessage: string): void {
    this.errorMessage = errorMessage || '';
  }

  public toResendVerificationCodePayload(): ResendVerificationCodePayload {
    return { verificationType: this.verificationType, emailAddress: this.emailAddress, phoneNumber: this.phoneNumber };
  }

  get verificationMessage(): string {
    return '';
  }

}
