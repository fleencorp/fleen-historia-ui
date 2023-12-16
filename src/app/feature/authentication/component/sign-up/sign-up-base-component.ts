import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {
  emailExistsValidator,
  enumTypeValidator,
  fieldsMatchValidator,
  passwordValidator,
  phoneNumberValidator
} from "@app/shared/validator";
import {DEFAULT_FORM_CONTROL_VALUE, DEFAULT_VERIFICATION_TYPE, VERIFICATION_TYPES} from "@app/constant";
import {AuthBaseComponent} from "../sign-in-up-base/auth-base.component";
import {PASSWORD_PATTERNS, PHONE_NUMBER} from "@app/model/pattern";

export abstract class SignUpBaseComponent extends AuthBaseComponent {

  protected initForm(): void {
    this.fleenForm = this.getFormBuilder().group({
      firstName: [DEFAULT_FORM_CONTROL_VALUE,
        [Validators.required, Validators.minLength(2), Validators.maxLength(100)]
      ],
      lastName: [DEFAULT_FORM_CONTROL_VALUE,
        [Validators.required, Validators.minLength(2), Validators.maxLength(100)]
      ],
      emailAddress: [DEFAULT_FORM_CONTROL_VALUE,
        {
          validators: [Validators.required, Validators.email, Validators.minLength(4), Validators.maxLength(150)],
          asyncValidators: [emailExistsValidator(this.getAuthenticationService())],
          updateOn: 'blur'
        }
      ],
      phoneNumber: [DEFAULT_FORM_CONTROL_VALUE,
        [Validators.required, Validators.minLength(4), Validators.maxLength(15), phoneNumberValidator(PHONE_NUMBER)]
      ],
      password: [DEFAULT_FORM_CONTROL_VALUE,
        [Validators.required, passwordValidator(PASSWORD_PATTERNS)]
      ],
      confirmPassword: [DEFAULT_FORM_CONTROL_VALUE,
        [Validators.required, passwordValidator(PASSWORD_PATTERNS)]
      ],
      verificationType: [DEFAULT_VERIFICATION_TYPE,
        [Validators.required, enumTypeValidator(VERIFICATION_TYPES)]
      ]
    }, {
      validators: [fieldsMatchValidator('password', 'confirmPassword', 'Password', 'Confirm Password')]
    });
  }

  abstract getFormBuilder(): FormBuilder;

  get firstName(): AbstractControl | null | undefined {
    return this.signUpForm?.get('firstName');
  }

  get lastName(): AbstractControl | null | undefined {
    return this.signUpForm?.get('lastName');
  }

  get emailAddress(): AbstractControl | null | undefined {
    return this.signUpForm?.get('emailAddress');
  }

  get phoneNumber(): AbstractControl | null | undefined {
    return this.signUpForm?.get('phoneNumber');
  }

  get password(): AbstractControl | null | undefined {
    return this.signUpForm?.get('password');
  }

  get confirmPassword(): AbstractControl | null | undefined {
    return this.signUpForm?.get('confirmPassword');
  }

  get verificationType(): AbstractControl | null | undefined {
    return this.signUpForm?.get('verificationType');
  }

  get signUpForm(): FormGroup {
    return this.fleenForm;
  }

}
