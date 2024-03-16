import {Injectable} from '@angular/core';
import {HttpClientService} from "@app/shared/service/impl";
import {Observable} from "rxjs";
import {BaseRequest} from "@app/model/type";
import {
  GetMemberUpdateDetailsResponse,
  SendUpdateEmailAddressOrPhoneNumberVerificationCodeResponse,
  UpdateEmailAddressOrPhoneNumberResponse,
  UpdateMemberDetailsResponse
} from "@app/model/response/member";
import {
  ConfirmUpdateEmailAddressPayload,
  ConfirmUpdatePhoneNumberPayload,
  SendUpdateEmailAddressOrPhoneNumberCodePayload,
  UpdateDetailPayload,
  UpdatePasswordPayload,
  UpdateProfilePhotoPayload
} from "@app/model/type/member.type";
import {FleenResponse} from "@app/model/response";
import {DeleteResponse} from "@app/model/response/common";

@Injectable()
export class MemberService {

  private readonly BASE_PATH: string = "member";

  public constructor(private readonly httpService: HttpClientService) { }

  public getDetail(): Observable<GetMemberUpdateDetailsResponse> {
    const req: BaseRequest = this.httpService.toRequest([this.BASE_PATH, 'get-details']);
    return this.httpService.get(req, GetMemberUpdateDetailsResponse);
  }

  public updateDetail(body: UpdateDetailPayload): Observable<UpdateMemberDetailsResponse> {
    const req: BaseRequest = this.httpService.toRequest([this.BASE_PATH, 'update-details'], null, { ...body });
    return this.httpService.update(req, UpdateMemberDetailsResponse);
  }

  public sendUpdateEmailAddressOrPhoneNumberCode(body: SendUpdateEmailAddressOrPhoneNumberCodePayload): Observable<SendUpdateEmailAddressOrPhoneNumberVerificationCodeResponse> {
    const req: BaseRequest = this.httpService.toRequest([this.BASE_PATH, 'send-update-email-address-phone-number-code'], null, { ...body });
    return this.httpService.post(req, SendUpdateEmailAddressOrPhoneNumberVerificationCodeResponse);
  }

  public confirmUpdateEmailAddress(body: ConfirmUpdateEmailAddressPayload): Observable<UpdateEmailAddressOrPhoneNumberResponse> {
    const req: BaseRequest = this.httpService.toRequest([this.BASE_PATH, 'confirm-update-email-address'], null, { ...body });
    return this.httpService.update(req, UpdateEmailAddressOrPhoneNumberResponse);
  }

  public confirmUpdatePhoneNumber(body: ConfirmUpdatePhoneNumberPayload): Observable<UpdateEmailAddressOrPhoneNumberResponse> {
    const req: BaseRequest = this.httpService.toRequest([this.BASE_PATH, 'confirm-update-phone-number'], null, { ...body });
    return this.httpService.update(req, UpdateEmailAddressOrPhoneNumberResponse);
  }

  public updatePassword(body: UpdatePasswordPayload): Observable<FleenResponse> {
    const req: BaseRequest = this.httpService.toRequest([this.BASE_PATH, 'update-password'], null, { ...body });
    return this.httpService.update(req, FleenResponse);
  }

  public updateProfilePhoto(body: UpdateProfilePhotoPayload): Observable<FleenResponse> {
    const req: BaseRequest = this.httpService.toRequest([this.BASE_PATH, 'update-profile-photo'], null, { ...body });
    return this.httpService.update(req, FleenResponse);
  }

  public removeProfilePhoto(): Observable<DeleteResponse> {
    const req: BaseRequest = this.httpService.toRequest([this.BASE_PATH, 'delete-profile-photo']);
    return this.httpService.delete(req, DeleteResponse);
  }

  public signOut(): Observable<FleenResponse> {
    const req: BaseRequest = this.httpService.toRequest([this.BASE_PATH, 'sign-out']);
    return this.httpService.get(req, FleenResponse);
  }
}
