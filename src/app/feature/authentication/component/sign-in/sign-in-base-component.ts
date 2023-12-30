import {AbstractControl, FormBuilder, FormGroup} from "@angular/forms";
import {AuthBaseComponent} from "../sign-in-up-base/auth-base.component";
import {email, maxLength, minLength, passwordValidator, required} from "@app/shared/validator";
import {PASSWORD_PATTERNS} from "@app/model/pattern";

export abstract class SignInBaseComponent extends AuthBaseComponent {

  public initForm(): void {
    this.fleenForm = this.getFormBuilder().group({
      emailAddress: ['', [required, email, minLength(5), maxLength(150)]],
      password: ['', [required, passwordValidator(PASSWORD_PATTERNS)]],
    });
    this.formReady();
  }

  protected abstract getFormBuilder(): FormBuilder;

  get emailAddress(): AbstractControl | null | undefined {
    return this.signInForm?.get('emailAddress');
  }

  get password(): AbstractControl | null | undefined {
    return this.signInForm?.get('password');
  }

  get signInForm(): FormGroup {
    return this.fleenForm;
  }

}
