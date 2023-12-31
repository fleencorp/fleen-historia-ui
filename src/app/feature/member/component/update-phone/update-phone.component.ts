import {Component, OnInit} from '@angular/core';
import {UpdateEmailOrPhoneComponent} from "@app/feature/member/component";
import {isFalsy} from "@app/shared/helper";
import {UpdateEmailAddressOrPhoneNumberResponse} from "@app/model/response/member";
import {ErrorResponse} from "@app/model/response";
import {VerificationType} from "@app/model/enum";
import {AbstractControl, FormBuilder, FormGroup} from "@angular/forms";
import {maxLength, minLength, phoneNumberValidator, required} from "@app/shared/validator";
import {PHONE_NUMBER} from "@app/model/pattern";
import {MemberService} from "@app/feature/member/service";

@Component({
  selector: 'app-update-phone',
  templateUrl: './update-phone.component.html',
  styleUrls: ['./update-phone.component.css']
})
export class UpdatePhoneComponent extends UpdateEmailOrPhoneComponent implements OnInit {

  public constructor(formBuilder: FormBuilder, memberService: MemberService) {
    super(formBuilder, memberService);
  }

  public ngOnInit(): void {
    this.onInit();
  }

  public updatePhoneNumber(): void {
    if (isFalsy(this.isSubmitting) && this.updatePhoneNumberForm?.valid) {
      this.memberService.confirmUpdatePhoneNumber(this.updatePhoneNumberForm.value)
        .subscribe({
          next: (result: UpdateEmailAddressOrPhoneNumberResponse): void => { this.setStatusMessage(result.message); },
          error: (error: ErrorResponse): void => { this.handleError(error); }
      });
    }
  }

  protected initForm(): void {
    this.formBuilder.group({
      phoneNumber: [this.memberDetail.phoneNumber, [required, phoneNumberValidator(PHONE_NUMBER), minLength(4), maxLength(15)]],
    });
    this.formReady();
  }

  public sendPhoneCode(): void {
    this.sendUpdateEmailAddressOrPhoneNumberCode(VerificationType.PHONE);
  }

  /**
   * Gets the entire updateDetail form group.
   * @returns The updateDetail form group.
   */
  get updatePhoneNumberForm(): FormGroup {
    return this.fleenForm;
  }

  get phoneNumber(): AbstractControl | null | undefined {
    return this.updatePhoneNumberForm?.get('phoneNumber');
  }

}
