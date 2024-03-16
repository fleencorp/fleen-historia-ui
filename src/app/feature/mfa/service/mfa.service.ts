import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {MfaStatusResponse} from "@app/model/response/mfa/mfa-status.response";
import {MfaDetailResponse} from "@app/model/response/mfa/mfa-detail.response";
import {HttpClientService} from "@app/shared/service/impl";
import {BaseRequest} from "@app/model/type";
import {ConfirmMfaPayload, MfaTypePayload} from "@app/model/type/mfa.type";
import {FleenResponse} from "@app/model/response";

@Injectable()
export class MfaService {

  private readonly BASE_PATH: string = "mfa";

  public constructor(private readonly httpService: HttpClientService) { }

  public getStatus(): Observable<MfaStatusResponse> {
    const req: BaseRequest = this.httpService.toRequest([this.BASE_PATH, 'status']);
    return this.httpService.get(req, MfaStatusResponse);
  }

  public setup(body: MfaTypePayload): Observable<MfaDetailResponse> {
    const req: BaseRequest = this.httpService.toRequest([this.BASE_PATH, 'setup'], null, { ...body });
    return this.httpService.update(req, MfaDetailResponse);
  }

  public resendMfaCode(body: MfaTypePayload): Observable<MfaDetailResponse> {
    const req: BaseRequest = this.httpService.toRequest([this.BASE_PATH, 'resend-mfa-setup-code'], null, { ...body });
    return this.httpService.update(req, MfaDetailResponse);
  }

  public confirmSetup(body: ConfirmMfaPayload): Observable<FleenResponse> {
    const req: BaseRequest = this.httpService.toRequest([this.BASE_PATH, 'confirm-mfa-setup'], null, { ...body });
    return this.httpService.update(req, FleenResponse);
  }

  public reEnable(): Observable<FleenResponse> {
    const req: BaseRequest = this.httpService.toRequest([this.BASE_PATH, 're-enable']);
    return this.httpService.update(req, FleenResponse);
  }

  public disable(): Observable<FleenResponse> {
    const req: BaseRequest = this.httpService.toRequest([this.BASE_PATH, 'disable']);
    return this.httpService.update(req, FleenResponse);
  }
}
