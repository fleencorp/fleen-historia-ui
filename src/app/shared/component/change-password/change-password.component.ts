import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BaseFormComponent} from "../../../base/component";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {passwordValidator} from "../../validator";
import {Router} from "@angular/router";
import {ChangePasswordPayload} from "../../../model/type";
import {ChangePasswordType} from "../../../model/enum";
import {ANY_EMPTY} from "../../../constant";
import {PASSWORD_PATTERNS} from "../../../model/pattern";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent extends BaseFormComponent implements OnInit {

  @Input('is-submitting') public override isSubmitting: boolean = false;
  @Input('change-password-type') public changePasswordType: ChangePasswordType = ChangePasswordType.NONE;
  @Output() public changePassword: EventEmitter<ChangePasswordPayload> = new EventEmitter<ChangePasswordPayload>();

  public constructor(protected formBuilder: FormBuilder) {
    super();
  }

  public ngOnInit(): void {
    this.initForm();
  }

  protected override getRouter(): Router {
    return ANY_EMPTY;
  }

  public submit(): void {
    if (this.fleenForm.valid) {
      const { password, confirmPassword } = this.fleenForm.value;
      this.changePassword.emit({password, confirmPassword, type: this.changePasswordType });
    }
  }

  protected initForm(): void {
    this.fleenForm = this.formBuilder.group({
      password: ['', [Validators.required, passwordValidator(PASSWORD_PATTERNS)]],
      confirmPassword: ['', [Validators.required, passwordValidator(PASSWORD_PATTERNS)]],
    });
  }

  public setErrorMessage(errorMessage: string): void {
    this.errorMessage = errorMessage || '';
  }

  get changePasswordForm(): FormGroup {
    return this.fleenForm;
  }

  get password(): AbstractControl | null | undefined {
    return this.fleenForm?.get('password');
  }

  get confirmPassword(): AbstractControl | null | undefined {
    return this.fleenForm?.get('confirmPassword');
  }

}
