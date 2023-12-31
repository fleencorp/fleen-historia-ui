import {Component, OnInit} from '@angular/core';
import {UpdateEmailOrPhoneComponent} from "../update-email-or-phone";
import {AbstractControl, FormBuilder, FormGroup} from "@angular/forms";
import {isFalsy} from "@app/shared/helper";
import {UpdateEmailAddressOrPhoneNumberResponse} from "@app/model/response/member";
import {ErrorResponse} from "@app/model/response";
import {email, maxLength, minLength, required} from "@app/shared/validator";
import {VerificationType} from "@app/model/enum";
import {MemberService} from "@app/feature/member/service";

@Component({
  selector: 'app-update-email',
  templateUrl: './update-email.component.html',
  styleUrls: ['./update-email.component.css']
})
export class UpdateEmailComponent extends UpdateEmailOrPhoneComponent implements OnInit {

  public constructor(formBuilder: FormBuilder, memberService: MemberService) {
    super(formBuilder, memberService);
  }

  public ngOnInit(): void {
    this.onInit();
  }

  public updateEmailAddress(): void {
    if (isFalsy(this.isSubmitting) && this.updateEmailAddressForm?.valid) {
      this.memberService.confirmUpdateEmailAddress(this.updateEmailAddressForm.value)
        .subscribe({
          next: (result: UpdateEmailAddressOrPhoneNumberResponse): void => { this.setStatusMessage(result.message); },
          error: (error: ErrorResponse): void => { this.handleError(error); }
      });
    }
  }

  protected initForm(): void {
    this.fleenForm = this.formBuilder.group({
      emailAddress: [this.memberDetail.emailAddress, [required, email, minLength(4), maxLength(150)]],
    });
    this.formReady();
  }

  public sendEmailCode(): void {
    this.sendUpdateEmailAddressOrPhoneNumberCode(VerificationType.EMAIL);
  }

  get emailAddress(): AbstractControl | null | undefined {
    return this.updateEmailAddressForm?.get('emailAddress');
  }

  /**
   * Gets the entire updateDetail form group.
   * @returns The updateDetail form group.
   */
  get updateEmailAddressForm(): FormGroup {
    return this.fleenForm;
  }
}
