import {Component, OnInit} from '@angular/core';
import {BaseFormImplComponent} from "@app/base/component";
import {AbstractControl, FormBuilder, FormGroup} from "@angular/forms";
import {MemberService} from "@app/feature/member/service";
import {GetMemberUpdateDetailsResponse, UpdateMemberDetailsResponse} from "@app/model/response/member";
import {ErrorResponse} from "@app/model/response";
import {isFalsy} from "@app/shared/helper";
import {maxLength, minLength, required} from "@app/shared/validator";

@Component({
  selector: 'app-update-detail',
  templateUrl: './update-detail.component.html',
  styleUrls: ['./update-detail.component.css']
})
/**
 * UpdateDetailComponent is a component responsible for updating member details.
 * Extends BaseFormImplComponent to inherit common form-related functionalities.
 */
export class UpdateDetailComponent extends BaseFormImplComponent implements OnInit {

  /**
   * Holds the response of member update details.
   */
  private memberDetail!: GetMemberUpdateDetailsResponse;

  /**
   * Constructor for UpdateDetailComponent.
   * @param formBuilder - The form builder service.
   * @param memberService - The member service.
   */
  public constructor(
    protected override readonly formBuilder: FormBuilder,
    protected readonly memberService: MemberService
  ) {
    super();
  }

  /**
   * Lifecycle hook called after component initialization.
   * Fetches member details and initializes the form.
   */
  public ngOnInit(): void {
    this.memberService.getDetail()
      .subscribe({
        next: (result: GetMemberUpdateDetailsResponse): void => { this.memberDetail = result; },
        error: (error: ErrorResponse): void => { this.handleError(error); },
        complete: (): void => { this.initForm(); }
    });
  }

  /**
   * Updates member details.
   * If not submitting and the form is valid, calls the member service to update details.
   */
  public updateDetail(): void {
    if (isFalsy(this.isSubmitting) && this.fleenForm.valid) {
      this.memberService.updateDetail(this.fleenForm.value)
        .subscribe({
          next: (result: UpdateMemberDetailsResponse): void => { this.setStatusMessage(result.message) },
          error: (error: ErrorResponse): void => { this.handleError(error); },
      });
    }
  }

  /**
   * Initializes the form with member details.
   */
  protected initForm(): void {
    this.fleenForm = this.formBuilder.group({
      firstName: [this.memberDetail?.firstName, [required, minLength(2), maxLength(100)]],
      lastName: [this.memberDetail?.lastName, [required, minLength(2), maxLength(100)]],
    });
    this.formReady();
  }

  /**
   * Gets the value of the 'firstName' form control.
   * @returns The value of the 'firstName' form control.
   */
  get firstName(): AbstractControl | null | undefined {
    return this.fleenForm?.get('firstName');
  }

  /**
   * Gets the value of the 'lastName' form control.
   * @returns The value of the 'lastName' form control.
   */
  get lastName(): AbstractControl | null | undefined {
    return this?.fleenForm?.get('lastName');
  }

  /**
   * Gets the entire updateDetail form group.
   * @returns The updateDetail form group.
   */
  get updateDetailForm(): FormGroup {
    return this.fleenForm;
  }

}
