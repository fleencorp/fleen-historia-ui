import {Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MfaStatusResponse} from "@app/model/response/mfa/mfa-status.response";
import {MfaService} from "../../service";
import {MfaDetailResponse} from "@app/model/response/mfa/mfa-detail.response";
import {ANY_EMPTY, DEFAULT_FORM_CONTROL_VALUE, MFA_SETUP_TYPE, MFA_TYPE_UNCHANGED} from "@app/constant";
import {BaseFormComponent} from "@app/base/component";
import {ErrorResponse, FleenResponse} from "@app/model/response";
import {codeOrOtpValidator, enumTypeValidator, maxLength, minLength, required} from "@app/shared/validator";
import {isFalsy, isTruthy} from "@app/shared/helper";
import {VERIFICATION_CODE} from "@app/model/pattern";
import {MfaType} from "@app/model/enum";
import {faArrowLeft, faCopy, faLock, faShield, IconDefinition} from "@fortawesome/free-solid-svg-icons";
import {Clipboard} from "@angular/cdk/clipboard";

@Component({
  selector: 'app-mfa-setup',
  templateUrl: './mfa-setup.component.html',
  styleUrls: ['./mfa-setup.component.css']
})
/**
 * MfaSetupComponent class represents a component for Multi-Factor Authentication (MFA) setup.
 * This component handles the setup process, verification, and confirmation of MFA.
 *
 * @author Yusuf Alamu Musa
 * @version 1.0
 */
export class MfaSetupComponent extends BaseFormComponent implements OnInit {

  /**
   * ViewChild decorator to get a reference to the QR code image element in the template.
   */
  @ViewChild('qrCodeImage', { static: false }) qrCodeImage!: ElementRef;

  /**
   * Represents the current MFA status.
   */
  public mfaStatus!: MfaStatusResponse;

  /**
   * Represents the details of the MFA setup, including the type, QR code, and secret.
   */
  public mfaDetail!: MfaDetailResponse;

  /**
   * Indicates whether the user can resend the verification code.
   */
  public canResendCode: boolean = false;

  /**
   * Indicates whether the component is in the code verification stage.
   */
  public isCodeVerificationStage: boolean = false;

  /**
   * Indicates whether the component is in the QR code verification stage.
   */
  public isQrVerificationStage: boolean = false;

  /**
   * Indicates whether the verification code has been sent.
   */
  public isVerificationCodeSent: boolean = false;

  /**
   * Represents the string indicating no MFA is set.
   */
  public NO_MFA: string = 'Multi Factor Authenticator Reset to none';

  /**
   * Holds the secret obtained from the QR code for authenticator-based MFA.
   */
  public qrCodeSecret: string = '';

  /**
   * Indicates whether all verification steps are complete.
   */
  public isAllVerificationStepsComplete: boolean = false;

  protected authenticatorSecretMessage: string = '';

  /**
   * Creates an instance of MfaSetupComponent.
   *
   * @param formBuilder - The FormBuilder instance used for creating and managing forms.
   * @param mfaService - The Multi-Factor Authentication (MFA) service for handling setup and verification.
   * @param clipBoard - The Clipboard service for copying text to clipboard.
   * @param renderer - The Renderer2 instance for manipulating the DOM.
   */
  public constructor(
    protected formBuilder: FormBuilder,
    protected mfaService: MfaService,
    protected clipBoard: Clipboard,
    private renderer: Renderer2
  ) {
    super();
  }

  /**
   * Lifecycle hook that is called after Angular has initialized all data-bound properties of a directive.
   */
  public ngOnInit(): void {
    this.enableLoading();
    this.mfaService.getStatus()
      .subscribe({
        next: (result: MfaStatusResponse): void => {
          this.mfaStatus = result;
          this.initForm();
        },
        error: (error: ErrorResponse): void => { this.handleError(error); },
        complete: (): void => { this.disableLoading(); }
    });
  }

  /**
   * Retrieves the router associated with the component.
   *
   * @returns The Router instance.
   */
  protected override getRouter(): Router {
    return ANY_EMPTY;
  }

  /**
   * Initializes the MFA setup form.
   */
  public initForm(): void {
    this.fleenForm = this.formBuilder.group({
      mfaType: [DEFAULT_FORM_CONTROL_VALUE,
        [Validators.required, enumTypeValidator(MFA_SETUP_TYPE)]
      ]
    });
    this.formReady();
  }

  /**
   * Initiates the Multi-Factor Authentication (MFA) setup process.
   * Validates form, disables submission during the process, and handles the setup response.
   */
  public setupMfa(): void {
    if (isFalsy(this.isSubmitting) && this.fleenForm.valid) {

      if (this.isMfaTypeUnchanged) {
        this.setStatusMessage(MFA_TYPE_UNCHANGED);
        return;
      }

      this.disableSubmittingAndResetErrorMessage();
      this.clearAllMessages();
      this.mfaService.setup(this.fleenForm.value)
        .subscribe({
          next: (result: MfaDetailResponse): void => {
            this.mfaDetail = result;
            this.clearVerificationCodeControl();
            this.initVerificationType(result);
            this.checkMfaTypeAndAddCodeFormControl(result);
            this.updateMfaStatus();
          },
          error: (error: ErrorResponse): void => { this.handleError(error); },
          complete: (): void => { this.enableSubmitting(); }
      });
    }
  }

  /**
   * Resends the verification code for Multi-Factor Authentication (MFA).
   * Validates the form and handles the response.
   */
  public resendVerificationCode(): void {
    if (isFalsy(this.isSendingVerificationCode) && this.mfaType?.valid) {
      this.resetErrorMessage();
      this.notifyUserVerificationCodeNotSentYet();
      this.enableIsSendingVerificationCode();

      this.mfaService.resendMfaCode(this.fleenForm.value)
        .subscribe({
          next: (): void => { this.notifyUserVerificationCodeSent(); },
          error: (error: ErrorResponse): void => { this.handleError(error); },
          complete: (): void => {
            this.disableIsSendingVerificationCode();
          }
      });
    }
  }

  /**
   * Confirms the Multi-Factor Authentication (MFA) setup.
   * Validates the form, handles the response, and updates the MFA status.
   */
  public confirmMfaSetup(): void {
    if (isFalsy(this.isSubmitting) && this.fleenForm.valid) {
      this.disableSubmittingAndResetErrorMessage();
      this.clearMessages();

      this.mfaService.confirmSetup(this.fleenForm.value)
        .subscribe({
          next: (result: FleenResponse): void => { this.handleSuccessfulMfaSetup(result); },
          error: (error: ErrorResponse): void => { this.handleError(error); },
          complete: (): void => { this.enableSubmitting(); }
      });
    }
  }

  /**
   * Adds the verification code form control to the form.
   * This method is used during the Multi-Factor Authentication (MFA) setup process to dynamically add
   * the verification code field to the form based on the selected MFA type.
   */
  private addCodeFormControl(): void {
    this.fleenForm.addControl(
      'code', this.formBuilder.control('', [
        required, minLength(1), maxLength(6), codeOrOtpValidator(VERIFICATION_CODE)]
      )
    );
  }

  /**
   * Notifies the user that the verification code has not been sent yet.
   * This method is used during the Multi-Factor Authentication (MFA) setup process to update the flag
   * indicating whether the verification code has been sent.
   */
  protected notifyUserVerificationCodeNotSentYet(): void {
    this.isVerificationCodeSent = false;
  }

  /**
   * Notifies the user that the verification code has been sent.
   * This method is used during the Multi-Factor Authentication (MFA) setup process to update the flag
   * indicating whether the verification code has been sent.
   */
  protected notifyUserVerificationCodeSent(): void {
    this.isVerificationCodeSent = true;
  }

  /**
   * Handles the successful Multi-Factor Authentication (MFA) setup.
   * Updates the MFA status, sets the status message, and resets checks after a successful setup.
   *
   * @param result - The successful setup response.
   */
  protected handleSuccessfulMfaSetup(result: FleenResponse): void {
    this.updateMfaStatus();
    this.statusMessage = result.message;
    this.resetChecksAfterSuccessfulMfaSetup();
  }

  /**
   * Resets various flags after a successful Multi-Factor Authentication (MFA) setup.
   * This method sets flags to indicate that all verification steps are complete, code verification
   * stage is inactive, code resend is disallowed, and no verification code has been sent.
   */
  private resetChecksAfterSuccessfulMfaSetup(): void {
    this.isAllVerificationStepsComplete = true;
    this.isCodeVerificationStage = false;
    this.canResendCode = false;
    this.isVerificationCodeSent = false;
  }


  /**
   * Checks the Multi-Factor Authentication (MFA) type and adds the verification code form control if necessary.
   * This method is used during the MFA setup process to determine whether a verification code form control
   * should be added based on the MFA type.
   *
   * @param mfaDetail - The MFA details containing the type.
   */
  private checkMfaTypeAndAddCodeFormControl(mfaDetail: MfaDetailResponse): void {
    const { mfaType } = mfaDetail;

     // If the MFA type is not NONE, add the verification code form control.
    if (mfaType !== MfaType.NONE) {
      this.addCodeFormControl();
    }
  }

  /**
   * Updates the Multi-Factor Authentication (MFA) status based on the selected type.
   */
  private updateMfaStatus(): void {
    this.mfaStatus.mfaType = this.mfaType?.value;
  }

  /**
   * Checks if the Multi-Factor Authentication (MFA) status has changed.
   *
   * @returns True if the status has changed, false otherwise.
   */
  private isMfaStatusChanged(): boolean {
    return this.mfaStatus?.mfaType !== this.mfaType?.value;
  }

  /**
   * Initializes the verification type based on the Multi-Factor Authentication (MFA) type.
   * This method sets flags indicating the verification stage, QR code verification, and updates the status message.
   *
   * @param mfaDetail - The MFA details containing the type.
   */
  private initVerificationType(mfaDetail: MfaDetailResponse): void {
    const { mfaType } = mfaDetail;

    // If the MFA type is EMAIL or PHONE, set the code verification stage and allow code resend.
    if (mfaType === MfaType.EMAIL || mfaType === MfaType.PHONE) {
      this.isCodeVerificationStage = true;
      this.canResendCode = true;
    }
    // If the MFA type is AUTHENTICATOR, set the code verification and QR code verification stages, and initialize the details for authenticator-based MFA.
    else if (mfaType === MfaType.AUTHENTICATOR) {
      this.isCodeVerificationStage = true;
      this.isQrVerificationStage = true;
      this.initAuthenticatorDetailsAndDisplayQrCode(mfaDetail);
    }
    // If the MFA type is NONE, set the status message indicating no MFA is set.
    else if (mfaType === MfaType.NONE) {
      this.statusMessage = this.NO_MFA;
    }
  }

  /**
   * Clears the verification code form control, resetting its value if it exists.
   * This method is used during the Multi-Factor Authentication (MFA) setup process to clear the entered verification code.
   */
  private clearVerificationCodeControl(): void {
    if (isTruthy(this.code)) {
      this.code?.reset();
    }
  }

  /**
   * Initializes the details for authenticator-based Multi-Factor Authentication (MFA)
   * and displays the QR code image in the designated container.
   *
   * @param mfaDetail - The MFA details containing the QR code and secret for authenticator-based MFA.
   */
  private initAuthenticatorDetailsAndDisplayQrCode(mfaDetail: MfaDetailResponse): void {
    const { qrCode, secret } = mfaDetail;
    const img = this.renderer.createElement('img');
    const p = this.renderer.createElement('p');
    const container = this.qrCodeImage.nativeElement;

    this.qrCodeSecret = secret;
    this.renderer.setStyle(p, 'text-align', 'center');
    this.renderer.setAttribute(img, 'src', qrCode);
    this.renderer.setAttribute(img, 'width', '300');
    this.renderer.setAttribute(img, 'height', '300');
    this.renderer.appendChild(p, img);
    this.renderer.appendChild(container, p);
  }

  public goBack(): void {
    this.isQrVerificationStage = false;
    this.isCodeVerificationStage = false;
    this.canResendCode = false;
    this.enableSubmitting();
    this.removeVerificationCodeControl();
    this.clearQrCodeAndSecretContainerElements();
  }

  private clearQrCodeAndSecretContainerElements(): void {
    const img: HTMLImageElement = this.qrCodeImage.nativeElement.querySelector('img');
    const p: HTMLParagraphElement = this.qrCodeImage.nativeElement.querySelector('p');

    if (img) {
      img.remove();
    }

    if (p) {
      p.remove();
    }
  }

  get isMfaTypeUnchanged(): boolean {
    return this.mfaStatus?.mfaType === this.mfaType?.value;

  }

  public copyAuthenticatorSecretToClipboard(): void {
    this.clipBoard.copy(this.qrCodeSecret);
    this.setAndRestoreAfterDelay('qrCodeSecret');
  }

  protected removeVerificationCodeControl(): void {
    this.fleenForm.removeControl('code');
  }

  get isAuthenticatorSecretAvailable(): string {
    return isTruthy(this.qrCodeSecret)
      ? this.qrCodeSecret
      : '';
  }


  /**
   * Gets a boolean value indicating whether the user can confirm MFA setup.
   */
  get canConfirmMfaSetup(): boolean {
    return this.isCodeVerificationStage;
  }

  /**
   * Gets the Multi-Factor Authentication (MFA) setup form.
   */
  get mfaSetupForm(): FormGroup {
    return this.fleenForm;
  }

  /**
   * Gets the form control for MFA type.
   */
  get mfaType(): AbstractControl | null | undefined {
    return this.mfaSetupForm?.get('mfaType');
  }

  /**
   * Gets the form control for the verification code.
   */
  get code(): AbstractControl | null | undefined {
    return this.mfaSetupForm?.get('code');
  }

  protected readonly faShield: IconDefinition = faShield;
  protected readonly faArrowLeft: IconDefinition = faArrowLeft;
  protected readonly faLock: IconDefinition = faLock;
  protected readonly faCopy: IconDefinition = faCopy;
}
