import {Component, OnInit} from '@angular/core';
import {MfaService} from "../../service/mfa.service";
import {MfaStatusResponse} from "@app/model/response/mfa/mfa-status.response";
import {Router} from "@angular/router";
import {FormBuilder} from "@angular/forms";
import {Observable} from "rxjs";
import {BaseFormComponent} from "@app/base/component";
import {ANY_EMPTY} from "@app/constant";
import {ErrorResponse, FleenResponse} from "@app/model/response";
import {capitalize} from "@app/shared/helper";
import {MfaType} from "@app/model/enum";

@Component({
  selector: 'app-mfa-status',
  templateUrl: './mfa-status.component.html',
  styleUrls: ['./mfa-status.component.css']
})
export class MfaStatusComponent extends BaseFormComponent implements OnInit {

  protected formBuilder!: FormBuilder;
  public mfaStatus!: MfaStatusResponse;

  public constructor(protected mfaService: MfaService) {
    super();
  }

  protected override getRouter(): Router {
    return ANY_EMPTY;
  }

  public ngOnInit(): void {
    this.mfaService.getStatus()
      .subscribe({
        next: (result: MfaStatusResponse): void => {
          this.mfaStatus = result;
        },
        error: (error: ErrorResponse): void => {
          this.handleError(error);
        }
    });
  }

  public reEnableOrDisableMfa(status: boolean): void {
    this.getServiceMethod(status)
      .subscribe({
        next: (result: FleenResponse): void => {
          this.statusMessage = result.message;
          this.updateMfaStatus(status);
        },
        error: (error: ErrorResponse): void => {
          this.handleError(error);
        }
    });
  }

  private getServiceMethod(status: boolean): Observable<FleenResponse> {
    return status ? this.mfaService.reEnable() : this.mfaService.disable();
  }

  private updateMfaStatus(status: boolean): void {
    this.mfaStatus.enabled = status;
  }

  protected readonly capitalize = capitalize;
  protected readonly MfaType = MfaType;
}
