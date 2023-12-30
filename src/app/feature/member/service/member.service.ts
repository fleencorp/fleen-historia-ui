import {Injectable} from '@angular/core';
import {HttpClientService} from "@app/shared/service/impl";
import {map, Observable} from "rxjs";
import {MfaStatusResponse} from "@app/model/response/mfa";
import {BaseRequest} from "@app/model/type";
import {GetMemberUpdateDetailsResponse} from "@app/model/response/member";
import {UpdateDetailPayload} from "@app/model/type/member.type";
import {UpdateMemberDetailsResponse} from "@app/model/response/member/update-member-details.response";

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
}
