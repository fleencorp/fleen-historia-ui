import {Component, OnInit} from '@angular/core';
import {BaseFormComponent} from "@app/base/component";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MemberService} from "@app/feature/member/service";
import {GetMemberUpdateDetailsResponse, UpdateMemberDetailsResponse} from "@app/model/response/member";
import {ErrorResponse} from "@app/model/response";
import {Router} from "@angular/router";
import {ANY_EMPTY} from "@app/constant";
import {isFalsy} from "@app/shared/helper";

@Component({
  selector: 'app-update-detail',
  templateUrl: './update-detail.component.html',
  styleUrls: ['./update-detail.component.css']
})
export class UpdateDetailComponent extends BaseFormComponent implements OnInit {

  private memberUpdateDetailsResponse!: GetMemberUpdateDetailsResponse;

  public constructor(
    protected readonly formBuilder: FormBuilder,
    protected readonly memberService: MemberService) {
    super();
  }

  /**
   * Retrieves the router associated with the component.
   *
   * @returns The Router instance.
   */
  protected override getRouter(): Router {
    return ANY_EMPTY;
  }

  public ngOnInit(): void {
    this.memberService.getDetail()
      .subscribe({
        next: (result: GetMemberUpdateDetailsResponse): void => { this.memberUpdateDetailsResponse = result; },
        error: (error: ErrorResponse): void => { this.handleError(error); },
        complete: (): void => { this.initForm(); }
    });
  }

  public updateDetail(): void {
    if (isFalsy(this.isSubmitting) && this.fleenForm.valid) {
      this.memberService.updateDetail(this.fleenForm.value)
        .subscribe({
          next: (result: UpdateMemberDetailsResponse): void => { this.statusMessage = result.message; },
          error: (error: ErrorResponse): void => { this.handleError(error); },
      });
    }
  }

  protected initForm(): void {
    this.fleenForm = this.formBuilder.group({
      firstName: [this.memberUpdateDetailsResponse?.firstName,
        [Validators.required, Validators.minLength(2), Validators.maxLength(100)]
      ],
      lastName: [this.memberUpdateDetailsResponse?.lastName,
        [Validators.required, Validators.minLength(2), Validators.maxLength(100)]
      ],
    });
    this.formReady();
  }

  get firstName(): AbstractControl | null | undefined {
    return this.fleenForm?.get('firstName')?.value;
  }

  get lastName(): AbstractControl | null | undefined {
    return this?.fleenForm?.get('lastName')?.value;
  }

  get updateDetailForm(): FormGroup {
    return this.fleenForm;
  }

}
