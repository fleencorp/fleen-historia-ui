import {BaseFormImplComponent} from "@app/base/component";
import {AbstractControl, FormBuilder} from "@angular/forms";
import {codeOrOtpValidator, maxLength, minLength, required} from "@app/shared/validator";
import {MemberService} from "@app/feature/member/service";
import {
  GetMemberUpdateDetailsResponse,
  SendUpdateEmailAddressOrPhoneNumberVerificationCodeResponse
} from "@app/model/response/member";
import {ErrorResponse} from "@app/model/response";
import {VERIFICATION_CODE} from "@app/model/pattern";
import {VerificationType} from "@app/model/enum";


export abstract class UpdateEmailOrPhoneComponent extends BaseFormImplComponent {

  protected memberDetail!: GetMemberUpdateDetailsResponse;
  public canRequestCode: boolean = true;
  public isVerificationCodeSent: boolean = false;
  public isVerificationCodeStage: boolean = false;

  protected constructor(
    protected override readonly formBuilder: FormBuilder,
    protected readonly memberService: MemberService) {
    super();
  }

  protected abstract initForm(): void;

  public onInit(): void {
    this.memberService.getDetail()
      .subscribe({
        next: (result: GetMemberUpdateDetailsResponse): void => { this.memberDetail = result; },
        error: (error: ErrorResponse): void => { this.handleError(error); },
        complete: () => { this.initForm(); }
    });
  }

  protected sendUpdateEmailAddressOrPhoneNumberCode(verificationType: VerificationType): void {
    this.memberService.sendUpdateEmailAddressOrPhoneNumberCode({ verificationType })
      .subscribe({
        next: (result: SendUpdateEmailAddressOrPhoneNumberVerificationCodeResponse): void => { this.handleSendVerificationCodeSuccess(result); },
        error: (error: ErrorResponse): void => { this.handleError(error); }
    });
  }

  private handleSendVerificationCodeSuccess(result: SendUpdateEmailAddressOrPhoneNumberVerificationCodeResponse): void {
    if (this.isCodeControlNotPresent()) {
      this.addCodeFormControl();
    }
    this.isVerificationCodeStage = true;
    this.isVerificationCodeSent = true;
    this.statusMessage = result.message;
  }

  /**
   * Adds the verification code form control to the form.
   * This method is used during the Multi-Factor Authentication (MFA) setup process to dynamically add
   * the verification code field to the form based on the selected MFA type.
   */
  private addCodeFormControl(): void {
    this.fleenForm.addControl(
      'code', this.formBuilder.control('', [
        required, minLength(1), maxLength(6), codeOrOtpValidator(VERIFICATION_CODE)]
      )
    );
  }

  private isCodeControlNotPresent(): boolean {
    return this.fleenForm?.get('code') === null;
  }

  get code(): AbstractControl | null | undefined {
    return this.fleenForm?.get('code');
  }

}
