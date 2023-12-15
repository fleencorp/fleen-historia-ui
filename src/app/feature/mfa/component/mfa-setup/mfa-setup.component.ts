import {Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MfaStatusResponse} from "@app/model/response/mfa/mfa-status.response";
import {MfaService} from "../../service/mfa.service";
import {MfaDetailResponse} from "@app/model/response/mfa/mfa-detail.response";
import {ANY_EMPTY, DEFAULT_FORM_CONTROL_VALUE, MFA_SETUP_TYPE} from "@app/constant";
import {BaseFormComponent} from "@app/base/component";
import {ErrorResponse, FleenResponse} from "@app/model/response";
import {codeOrOtpValidator, enumTypeValidator} from "@app/shared/validator";
import {isFalsy} from "@app/shared/helper";
import {VERIFICATION_CODE} from "@app/model/pattern";
import {MfaType} from "@app/model/enum";

@Component({
  selector: 'app-mfa-setup',
  templateUrl: './mfa-setup.component.html',
  styleUrls: ['./mfa-setup.component.css']
})
export class MfaSetupComponent extends BaseFormComponent implements OnInit {

  @ViewChild('qrCodeImage', { static: false }) qrCodeImage!: ElementRef;
  public mfaStatus!: MfaStatusResponse;
  public mfaDetail!: MfaDetailResponse;
  public isCodeVerification: boolean = false;
  public isQrVerification: boolean = false;
  public isVerificationCodeSent: boolean = false;
  public NO_MFA: string = 'Multi Factor Authenticator Reset to none';
  public qrCodeSecret: string = '';
  public isAllVerificationComplete: boolean = false;


  public constructor(
    protected formBuilder: FormBuilder,
    protected mfaService: MfaService,
    private renderer: Renderer2) {
    super();
  }

  public ngOnInit(): void {
    this.mfaService.getStatus()
      .subscribe({
        next: (result: MfaStatusResponse): void => {
          this.mfaStatus = result;
          this.initForm();
        },
        error: (error: ErrorResponse): void => {
          this.handleError(error);
        }
    });
  }

  protected override getRouter(): Router {
    return ANY_EMPTY;
  }

  public initForm(): void {
    this.fleenForm = this.formBuilder.group({
      mfaType: [DEFAULT_FORM_CONTROL_VALUE,
        [Validators.required, enumTypeValidator(MFA_SETUP_TYPE)]
      ]
    });
    this.formReady();
  }

  public setupMfa(): void {
    if (isFalsy(this.isSubmitting) && this.fleenForm.valid) {
      this.disableSubmittingAndResetErrorMessage();

      this.mfaService.setup(this.fleenForm.value)
        .subscribe({
          next: (result: MfaDetailResponse): void => {
            this.mfaDetail = result;
            this.initVerificationType(result);
          },
          error: (error: ErrorResponse): void => {
            this.handleError(error);
          },
          complete: (): void => {
            this.enableSubmitting();
            this.addCodeFormControl();
          }
      });
    }
  }

  public resendVerificationCode(): void {
    if (isFalsy(this.isSubmitting) && this.fleenForm.valid) {
      this.disableSubmittingAndResetErrorMessage();
      this.isVerificationCodeSent = false;
      this.mfaService.setup(this.fleenForm.value)
        .subscribe({
          error: (error: ErrorResponse): void => {
            this.handleError(error);
          },
          complete: (): void => {
            this.enableSubmitting();
            this.isVerificationCodeSent = true;
          }
      });
    }
  }

  public confirmMfaSetup(): void {
    if (isFalsy(this.isSubmitting) && this.fleenForm.valid) {
      this.disableSubmittingAndResetErrorMessage();

      this.mfaService.confirmSetup(this.fleenForm.value)
        .subscribe({
          next: (result: FleenResponse): void => {
            this.statusMessage = result.message;
            this.isAllVerificationComplete = true;
          },
          error: (error: ErrorResponse): void => {
            this.handleError(error);
          }
        })
    }
  }

  private addCodeFormControl(): void {
    this.fleenForm.addControl(
      'code', this.formBuilder.control('', [
        Validators.required, Validators.minLength(1), Validators.maxLength(6), codeOrOtpValidator(VERIFICATION_CODE)]
      )
    );
  }

  private initVerificationType(mfaDetail: MfaDetailResponse): void {
    const { mfaType } = mfaDetail;
    if (mfaType === MfaType.EMAIL || mfaType === MfaType.PHONE) {
      this.isCodeVerification = true;
    } else if (mfaType === MfaType.AUTHENTICATOR) {
      this.isCodeVerification = true;
      this.isQrVerification = true;
      this.initAuthenticatorDetails(mfaDetail);
    } else if (mfaType === MfaType.NONE) {
      this.statusMessage = this.NO_MFA;
    }
  }

  private initAuthenticatorDetails(mfaDetail: MfaDetailResponse): void {
    const { qrCode, secret } = mfaDetail;
    const img = this.renderer.createElement('img');
    const container = this.qrCodeImage.nativeElement;

    this.qrCodeSecret = secret;
    this.renderer.setAttribute(img, 'src', qrCode);
    this.renderer.appendChild(container, img);
  }

  get mfaSetupForm(): FormGroup {
    return this.fleenForm;
  }

  get mfaType(): AbstractControl | null | undefined {
    return this.mfaSetupForm?.get('mfaType');
  }

  get code(): AbstractControl | null | undefined {
    return this.mfaSetupForm?.get('code');
  }
}
