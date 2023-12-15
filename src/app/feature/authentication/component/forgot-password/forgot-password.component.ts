import {Component, OnInit} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {Router} from "@angular/router";
import {BaseFormComponent} from "@app/base/component";
import {ChangePasswordType, VerificationType} from "@app/model/enum";
import {AuthenticationService} from "../../service/authentication.service";
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

  public constructor(protected authenticationService: AuthenticationService,
                     protected router: Router) {
    super();
  }

  ngOnInit(): void {
    this.emailAddress.addValidators([
      Validators.required, Validators.email, Validators.minLength(4), Validators.maxLength(150)
    ]);
    this.verificationCode.addValidators([
      Validators.required, Validators.minLength(1), Validators.maxLength(6), codeOrOtpValidator(VERIFICATION_CODE)
    ]);
  }

  protected override getRouter(): Router {
    return this.router;
  }

  public submit(event: Event): void {
    this.stopEvent(event);
    if (this.emailAddress.valid && isFalsy(this.isSubmitting)) {
      const emailAddress: string = this.emailAddress.value.toString();
      const payload: ForgotPasswordPayload = { emailAddress, verificationType: VerificationType.EMAIL };
      this.authenticationService.clearAuthTokens();
      this.disableSubmittingAndResetErrorMessage();

      this.authenticationService.forgotPassword(payload)
        .subscribe({
          next: (result: ForgotPasswordResponse): void => {
            this.phoneNumber = result.phoneNumber;
            this.isDetailValid = true;
          },
          error: (result: ErrorResponse): void => {
            this.handleError(result);
          },
          complete: (): void => {
            this.enableSubmitting();
          }
      });
    }
  }

  public submitOtp(event: Event): void {
    this.stopEvent(event);
    if (this.emailAddress.valid && this.verificationCode.valid && isFalsy(this.isSubmitting)) {
      const emailAddress: string = this.emailAddress.value.toString();
      const payload: ResetPasswordPayload = { emailAddress, code: this.verificationCode.value };
      this.disableSubmittingAndResetErrorMessage();

      this.authenticationService.verifyResetPasswordCode(payload)
        .subscribe({
          next: (result: InitiatePasswordChangeResponse): void => {
            this.authenticationService.clearAuthTokens();
            this.authenticationService.saveAuthToken(result.accessToken);
            this.isChangePasswordStage = true;
          },
          error: (result: ErrorResponse): void => {
            this.handleError(result);
          },
          complete: (): void => {
            this.enableSubmitting();
          }
      });
    }
  }

  public changePassword(payload: ChangePasswordPayload): void {
    if (isFalsy(this.isSubmitting)) {
      this.disableSubmittingAndResetErrorMessage();

      this.authenticationService.resetAndChangePassword(payload)
        .subscribe({
          error: (result: ErrorResponse): void => {
            this.handleError(result);
          },
          complete: (): void => {
            this.enableSubmitting();
            this.authenticationService.clearAuthTokens();
            this.authenticationService.startAuthentication(this.router);
          }
      });
    }
  }

}
