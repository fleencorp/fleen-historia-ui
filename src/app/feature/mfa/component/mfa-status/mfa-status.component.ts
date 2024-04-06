import {Component, OnInit} from '@angular/core';
import {MfaService} from "../../service";
import {MfaStatusResponse} from "@app/model/response/mfa/mfa-status.response";
import {Router} from "@angular/router";
import {FormBuilder} from "@angular/forms";
import {Observable} from "rxjs";
import {BaseFormComponent} from "@app/base/component";
import {ANY_EMPTY} from "@app/constant";
import {ErrorResponse, FleenResponse} from "@app/model/response";
import {MfaType} from "@app/model/enum";
import {faLock, faUnlock, IconDefinition} from "@fortawesome/free-solid-svg-icons";
import {isFalsy} from "@app/shared/helper";

@Component({
  selector: 'app-mfa-status',
  templateUrl: './mfa-status.component.html',
  styleUrls: ['./mfa-status.component.css']
})
/**
 * MfaStatusComponent class represents a component for managing Multi-Factor Authentication (MFA) status.
 *
 * @author Yusuf Alamu Musa
 * @version 1.0
 */
export class MfaStatusComponent extends BaseFormComponent implements OnInit {

  /**
   * The FormBuilder instance used for creating and managing forms.
   */
  protected formBuilder!: FormBuilder;

  /**
   * Represents the current MFA status.
   */
  public mfaStatus!: MfaStatusResponse;

  /**
   * Creates an instance of MfaStatusComponent.
   *
   * @param mfaService - The Multi-Factor Authentication (MFA) service used for retrieving and updating MFA status.
   */
  public constructor(protected mfaService: MfaService) {
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

  /**
   * Lifecycle hook that is called after Angular has initialized all data-bound properties of a directive.
   */
  public ngOnInit(): void {
    this.enableLoading();

    this.mfaService.getStatus()
      .subscribe({
        next: (result: MfaStatusResponse): void => { this.mfaStatus = result; },
        error: (error: ErrorResponse): void => { this.handleError(error); },
        complete: (): void => { this.disableLoading(); }
    });
  }

  /**
   * Re-enables or disables Multi-Factor Authentication (MFA) based on the specified status.
   *
   * @param status - A boolean indicating whether to enable or disable MFA.
   */
  public reEnableOrDisableMfa(status: boolean): void {
    if (isFalsy(this.isSubmitting)) {
      this.disableSubmitting();

      this.getServiceMethod(status)
        .subscribe({
          next: (result: FleenResponse): void => {
            this.statusMessage = result.message;
            this.updateMfaStatus(status);
          },
          error: (error: ErrorResponse): void => { this.handleError(error); },
          complete: (): void => { this.enableSubmitting(); }
      });
    }
  }

  /**
   * Retrieves the appropriate service method based on the specified status.
   *
   * @param status - A boolean indicating whether to enable or disable MFA.
   * @returns An Observable of type FleenResponse.
   */
  private getServiceMethod(status: boolean): Observable<FleenResponse> {
    return status ? this.mfaService.reEnable() : this.mfaService.disable();
  }

  /**
   * Updates the MFA status based on the specified status.
   *
   * @param status - A boolean indicating whether to enable or disable MFA.
   */
  private updateMfaStatus(status: boolean): void {
    this.mfaStatus.enabled = status;
  }

  /**
   * Represents the Multi-Factor Authentication (MFA) types available.
   */
  protected readonly MfaType = MfaType;
  protected readonly faLock: IconDefinition = faLock;
  protected readonly faUnlock: IconDefinition = faUnlock;
}
