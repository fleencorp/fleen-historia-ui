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
import {faPhone, faShield, IconDefinition} from "@fortawesome/free-solid-svg-icons";

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
    this.fleenForm = this.formBuilder.group({
      phoneNumber: [this.memberDetail.phoneNumber, [required, phoneNumberValidator(PHONE_NUMBER), minLength(4), maxLength(15)]],
    });
    if (this.isCodeControlNotPresent()) {
      this.addCodeFormControl();
    }
    this.formReady();
  }

  public sendPhoneCode(): void {
    this.sendUpdateEmailAddressOrPhoneNumberCode(VerificationType.PHONE);
  }

  get phoneNumber(): AbstractControl | null | undefined {
    return this.updatePhoneNumberForm?.get('phoneNumber');
  }

  get canRequestCode(): boolean {
    return !(this.phoneNumber?.valid);
  }

  /**
   * Gets the entire updateDetail form group.
   * @returns The updateDetail form group.
   */
  get updatePhoneNumberForm(): FormGroup {
    return this.fleenForm;
  }

  protected readonly faShield: IconDefinition = faShield;
  protected readonly faPhone: IconDefinition = faPhone;
}
