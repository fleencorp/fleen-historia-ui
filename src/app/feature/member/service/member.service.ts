import {Injectable} from '@angular/core';
import {HttpClientService} from "@app/shared/service/impl";
import {map, Observable} from "rxjs";
import {BaseRequest} from "@app/model/type";
import {
  GetMemberUpdateDetailsResponse,
  SendUpdateEmailAddressOrPhoneNumberVerificationCodeResponse, UpdateEmailAddressOrPhoneNumberResponse,
  UpdateMemberDetailsResponse
} from "@app/model/response/member";
import {
  ConfirmUpdateEmailAddressPayload, ConfirmUpdatePhoneNumberPayload,
  SendUpdateEmailAddressOrPhoneNumberCodePayload,
  UpdateDetailPayload, UpdatePasswordPayload
} from "@app/model/type/member.type";
import {FleenResponse} from "@app/model/response";

@Injectable()
export class MemberService {

  private readonly BASE_PATH: string = "member";

  public constructor(private readonly httpService: HttpClientService) { }

  public getDetail(): Observable<GetMemberUpdateDetailsResponse> {
    const req: BaseRequest = this.httpService.toRequest([this.BASE_PATH, 'get-details']);
    return this.httpService.get(req)
      .pipe(
        map(data => new GetMemberUpdateDetailsResponse(data))
      );
  }

  public updateDetail(body: UpdateDetailPayload): Observable<UpdateMemberDetailsResponse> {
    const req: BaseRequest = this.httpService.toRequest([this.BASE_PATH, 'update-details'], null, { ...body });
    return this.httpService.update(req)
      .pipe(
        map(data => new UpdateMemberDetailsResponse(data))
      );
  }

  public sendUpdateEmailAddressOrPhoneNumberCode(body: SendUpdateEmailAddressOrPhoneNumberCodePayload): Observable<SendUpdateEmailAddressOrPhoneNumberVerificationCodeResponse> {
    const req: BaseRequest = this.httpService.toRequest([this.BASE_PATH, 'send-update-email-address-phone-number-code'], null, { ...body });
    return this.httpService.post(req)
      .pipe(
        map(data => new SendUpdateEmailAddressOrPhoneNumberVerificationCodeResponse(data))
      );
  }

  public confirmUpdateEmailAddress(body: ConfirmUpdateEmailAddressPayload): Observable<UpdateEmailAddressOrPhoneNumberResponse> {
    const req: BaseRequest = this.httpService.toRequest([this.BASE_PATH, 'confirm-update-email-address'], null, { ...body });
    return this.httpService.update(req)
      .pipe(
        map(data => new UpdateEmailAddressOrPhoneNumberResponse(data))
      );
  }

  public confirmUpdatePhoneNumber(body: ConfirmUpdatePhoneNumberPayload): Observable<UpdateEmailAddressOrPhoneNumberResponse> {
    const req: BaseRequest = this.httpService.toRequest([this.BASE_PATH, 'confirm-update-phone-number'], null, { ...body });
    return this.httpService.update(req)
      .pipe(
        map(data => new UpdateEmailAddressOrPhoneNumberResponse(data))
      );
  }

  public updatePassword(body: UpdatePasswordPayload): Observable<FleenResponse> {
    const req: BaseRequest = this.httpService.toRequest([this.BASE_PATH, 'update-password'], null, { ...body });
    return this.httpService.update(req)
      .pipe(
        map(data => new FleenResponse(data))
      );
  }
}
