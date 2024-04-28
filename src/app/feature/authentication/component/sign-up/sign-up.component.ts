import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {AuthenticationService} from "@app/feature/authentication/service";
import {SignUpBaseComponent} from "./sign-up-base-component";
import {isFalsy, isTruthy} from "@app/shared/helper";
import {MfaVerificationComponent, OtpVerificationComponent} from "../../component";
import {Router} from "@angular/router";
import {SignUpResponse} from "@app/model/response/authentication";
import {ErrorResponse} from "@app/model/response";
import {CustomRecaptchaService, SessionStorageService} from "@app/base/service";
import {ChangePasswordComponent} from "@app/shared/component";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent extends SignUpBaseComponent implements OnInit {

  @ViewChild(OtpVerificationComponent) otpVerificationComponent!: OtpVerificationComponent;
  protected isPreVerificationStage: boolean = false;

  constructor(
      private authenticationService: AuthenticationService,
      protected customRecaptchaService: CustomRecaptchaService,
      protected formBuilder: FormBuilder,
      protected router: Router,
      protected sessionStorageService: SessionStorageService) {
    super();
  }

  public ngOnInit(): void {
    this.initForm();
  }

  protected override getSessionStorageService(): SessionStorageService {
    return this.sessionStorageService;
  }

  protected override getRouter(): Router {
    return this.router;
  }

  override getAuthenticationService(): AuthenticationService {
    return this.authenticationService;
  }

  override getOtpComponent(): OtpVerificationComponent {
    return this.otpVerificationComponent;
  }

  override getMfaVerificationComponent(): MfaVerificationComponent | null {
    return null;
  }

  override getChangePasswordComponent(): ChangePasswordComponent | null {
    return null;
  }

  override getFormBuilder(): FormBuilder {
    return this.formBuilder;
  }

  /**
   * Initiates the sign-up process.
   *
   * Validates the sign-up form, disables submitting, and resets the error message before calling the
   * authentication service's sign-up method. Handles the success, error, and completion events of the sign-up process.
   *
   * @public
   */
  public async signUp(): Promise<void> {
    if (isFalsy(this.signUpForm) || this.signUpForm.invalid || isTruthy(this.isSubmitting)) {
      return;
    }

    this.disableSubmittingAndResetErrorMessage();

    const recaptchaToken: string = await this.customRecaptchaService.extractRecaptchaToken('importantAction');
    this.authenticationService.signUp(this.signUpForm.value, recaptchaToken)
      .subscribe({
        next: (result: SignUpResponse): void => { this.handleSignUpSuccess(result); },
        error: (result: ErrorResponse): void => { this.handleError(result); },
        complete: (): void => { this.enableSubmitting(); }
    });
  }

  /**
   * Handles the success of the sign-up process.
   *
   * Sets the pre-verification stage and sets the authentication token.
   *
   * @param {SignUpResponse} result - The result of the sign-up process.
   * @private
   */
  private handleSignUpSuccess(result: SignUpResponse): void {
    this.isPreVerificationStage = true;
    this.authenticationService.setAuthToken(result);
  }


  get $emailAddress(): string {
    return this.signUpForm?.get('emailAddress')?.value;
  }

  get $phoneNumber(): string {
    return this.signUpForm?.get('phoneNumber')?.value;
  }
}
