import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup} from "@angular/forms";
import {MemberService} from "@app/feature/member/service";
import {ErrorResponse, FleenResponse} from "@app/model/response";
import {isFalsy} from "@app/shared/helper";
import {fieldsMatchValidator, passwordValidator, required} from "@app/shared/validator";
import {BaseFormImplComponent} from "@app/base/component";
import {DEFAULT_FORM_CONTROL_VALUE} from "@app/constant";
import {PASSWORD_PATTERNS} from "@app/model/pattern";

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css']
})
export class UpdatePasswordComponent extends BaseFormImplComponent implements OnInit {

  /**
   * Constructor for UpdatePasswordComponent.
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
    this.initForm();
  }

  /**
   * Updates member details.
   * If not submitting and the form is valid, calls the member service to update details.
   */
  public updatePassword(): void {
    if (isFalsy(this.isSubmitting) && this.fleenForm.valid) {
      this.memberService.updatePassword(this.fleenForm.value)
        .subscribe({
          next: (result: FleenResponse): void => { this.setStatusMessage(result.message); },
          error: (error: ErrorResponse): void => { this.handleError(error); },
      });
    }
  }

  /**
   * Initializes the form with member details.
   */
  protected initForm(): void {
    this.fleenForm = this.formBuilder.group({
      oldPassword: [DEFAULT_FORM_CONTROL_VALUE, [required, passwordValidator(PASSWORD_PATTERNS)]
      ],
      password: [DEFAULT_FORM_CONTROL_VALUE, [required, passwordValidator(PASSWORD_PATTERNS)]
      ],
      confirmPassword: [DEFAULT_FORM_CONTROL_VALUE, [required, passwordValidator(PASSWORD_PATTERNS)]
      ],
    }, {
      validators: [fieldsMatchValidator('password', 'confirmPassword', 'Password', 'Confirm Password')]
    });
    this.formReady();
  }

  /**
   * Gets the value of the 'oldPassword' form control.
   * @returns The value of the 'oldPassword' form control.
   */
  get oldPassword(): AbstractControl | null | undefined {
    return this.fleenForm?.get('oldPassword');
  }

  /**
   * Gets the value of the 'password' form control.
   * @returns The value of the 'password' form control.
   */
  get password(): AbstractControl | null | undefined {
    return this.fleenForm?.get('password');
  }

  /**
   * Gets the value of the 'confirmPassword' form control.
   * @returns The value of the 'confirmPassword' form control.
   */
  get confirmPassword(): AbstractControl | null | undefined {
    return this.fleenForm?.get('confirmPassword');
  }

  /**
   * Gets the entire updateDetail form group.
   * @returns The updateDetail form group.
   */
  get updatePasswordForm(): FormGroup {
    return this.fleenForm;
  }
}
