import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BaseFormComponent} from "@app/base/component";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {passwordValidator} from "../../validator";
import {Router} from "@angular/router";
import {ChangePasswordPayload} from "@app/model/type";
import {ChangePasswordType} from "@app/model/enum";
import {ANY_EMPTY} from "@app/constant";
import {PASSWORD_PATTERNS} from "@app/model/pattern";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
/**
 * @class ChangePasswordComponent
 * @extends BaseFormComponent
 *
 * Component for handling password change functionality. It extends BaseFormComponent to utilize form-related features.
 *
 *
 * @version 1.0
 * @author Yusuf Alamu Musa
 */
export class ChangePasswordComponent extends BaseFormComponent implements OnInit {

  /**
   * Indicates whether a password change request is currently being submitted.
   */
  @Input('is-submitting') public override isSubmitting: boolean = false;

  /**
   * Specifies the type of password change operation (e.g., ChangePasswordType.NONE).
   */
  @Input('change-password-type') public changePasswordType: ChangePasswordType = ChangePasswordType.NONE;

  /**
   * Event emitter for notifying when a password change is requested.
   */
  @Output() public changePassword: EventEmitter<ChangePasswordPayload> = new EventEmitter<ChangePasswordPayload>();

  /**
   * Constructor for ChangePasswordComponent.
   *
   * @param {FormBuilder} formBuilder - Angular's FormBuilder for working with forms.
   */
  public constructor(protected formBuilder: FormBuilder) {
    super();
  }

  /**
   * Angular lifecycle hook called after the component has been initialized. Calls the initForm method.
   */
  public ngOnInit(): void {
    this.initForm();
  }

  /**
   * Overrides the getRouter method from the base class. Returns an undefined value.
   *
   * @returns {Router} - The router instance (undefined in this case).
   */
  protected override getRouter(): Router {
    return ANY_EMPTY; // Replace with actual router instance if needed.
  }

  /**
   * Handles the form submission for password change, emits a changePassword event if the form is valid.
   */
  public submit(): void {
    if (this.fleenForm.valid) {
      const { password, confirmPassword } = this.fleenForm.value;
      this.changePassword.emit({ password, confirmPassword, type: this.changePasswordType });
    }
  }

  /**
   * Initializes the form using Angular's FormBuilder, setting up form controls for password and confirmPassword.
   */
  protected initForm(): void {
    this.fleenForm = this.formBuilder.group({
      password: ['', [Validators.required, passwordValidator(PASSWORD_PATTERNS)]],
      confirmPassword: ['', [Validators.required, passwordValidator(PASSWORD_PATTERNS)]],
    });
  }

  /**
   * Getter for accessing the underlying form group.
   *
   * @returns {FormGroup} - The form group for password change.
   */
  get changePasswordForm(): FormGroup {
    return this.fleenForm;
  }

  /**
   * Getter for accessing the 'password' form control.
   *
   * @returns {AbstractControl | null | undefined} - The 'password' form control.
   */
  get password(): AbstractControl | null | undefined {
    return this.fleenForm?.get('password');
  }

  /**
   * Getter for accessing the 'confirmPassword' form control.
   *
   * @returns {AbstractControl | null | undefined} - The 'confirmPassword' form control.
   */
  get confirmPassword(): AbstractControl | null | undefined {
    return this.fleenForm?.get('confirmPassword');
  }

}
