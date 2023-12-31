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
import {isFalsy} from "@app/shared/helper";


export abstract class UpdateEmailOrPhoneComponent extends BaseFormImplComponent {

  protected memberDetail!: GetMemberUpdateDetailsResponse;
  public isVerificationCodeSent: boolean = false;
  public isVerificationCodeStage: boolean = false;
  protected isSendingCode: boolean = false;

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
    if (isFalsy(this.isSendingCode)) {
      this.enableIsSendingCode();

      this.memberService.sendUpdateEmailAddressOrPhoneNumberCode({ verificationType })
        .subscribe({
          next: (result: SendUpdateEmailAddressOrPhoneNumberVerificationCodeResponse): void => { this.handleSendVerificationCodeSuccess(result); },
          error: (error: ErrorResponse): void => { this.handleError(error); },
          complete: (): void => { this.disableIsSendingCode(); }
      });
    }
  }

  private handleSendVerificationCodeSuccess(result: SendUpdateEmailAddressOrPhoneNumberVerificationCodeResponse): void {
    this.isVerificationCodeStage = true;
    this.isVerificationCodeSent = true;
    this.statusMessage = result.message;
  }

  private enableIsSendingCode(): void {
    this.isSendingCode = true;
  }

  private disableIsSendingCode(): void {
    this.isSendingCode = false;
  }

  /**
   * Adds the verification code form control to the form.
   * This method is used during the Multi-Factor Authentication (MFA) setup process to dynamically add
   * the verification code field to the form based on the selected MFA type.
   */
  protected addCodeFormControl(): void {
    this.fleenForm.addControl(
      'code', this.formBuilder.control('', [
        required, minLength(1), maxLength(6), codeOrOtpValidator(VERIFICATION_CODE)]
      )
    );
  }

  protected isCodeControlNotPresent(): boolean {
    return this.fleenForm?.get('code') === null;
  }

  get code(): AbstractControl | null | undefined {
    return this.fleenForm?.get('code');
  }

}
