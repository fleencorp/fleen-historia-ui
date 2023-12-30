import {AbstractControl, FormBuilder, FormGroup} from "@angular/forms";
import {
  email,
  emailExistsValidator,
  enumTypeValidator,
  fieldsMatchValidator,
  maxLength,
  minLength,
  passwordValidator,
  phoneNumberExistsValidator,
  phoneNumberValidator,
  required
} from "@app/shared/validator";
import {DEFAULT_FORM_CONTROL_VALUE, DEFAULT_VERIFICATION_TYPE, VERIFICATION_TYPES} from "@app/constant";
import {AuthBaseComponent} from "../sign-in-up-base/auth-base.component";
import {PASSWORD_PATTERNS, PHONE_NUMBER} from "@app/model/pattern";

export abstract class SignUpBaseComponent extends AuthBaseComponent {

  protected initForm(): void {
    this.fleenForm = this.getFormBuilder().group({
      firstName: [DEFAULT_FORM_CONTROL_VALUE, [required, minLength(2), maxLength(100)]
      ],
      lastName: [DEFAULT_FORM_CONTROL_VALUE, [required, minLength(2), maxLength(100)]
      ],
      emailAddress: [DEFAULT_FORM_CONTROL_VALUE,
        {
          validators: [required, email, minLength(4), maxLength(150)],
          asyncValidators: [emailExistsValidator(this.getAuthenticationService())],
          updateOn: 'blur'
        }
      ],
      phoneNumber: [DEFAULT_FORM_CONTROL_VALUE,
        {
          validators: [required, phoneNumberValidator(PHONE_NUMBER), minLength(4), maxLength(15), ],
          asyncValidators: [phoneNumberExistsValidator(this.getAuthenticationService())],
          updateOn: 'blur'
        }
      ],
      password: [DEFAULT_FORM_CONTROL_VALUE, [required, passwordValidator(PASSWORD_PATTERNS)]
      ],
      confirmPassword: [DEFAULT_FORM_CONTROL_VALUE, [required, passwordValidator(PASSWORD_PATTERNS)]
      ],
      verificationType: [DEFAULT_VERIFICATION_TYPE, [required, enumTypeValidator(VERIFICATION_TYPES)]
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
