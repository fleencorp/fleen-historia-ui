import {Injectable} from '@angular/core';
import {HttpClientService} from "@app/shared/service/impl";
import {map, Observable} from "rxjs";
import {MfaStatusResponse} from "@app/model/response/mfa";
import {BaseRequest} from "@app/model/type";
import {MemberUpdateDetailsResponse} from "@app/model/response/member";
import {UpdateDetailPayload} from "@app/model/type/member.type";

@Injectable()
export class MemberService {

  private readonly BASE_PATH: string = "member";

  public constructor(private readonly httpService: HttpClientService) { }

  public getDetail(): Observable<MemberUpdateDetailsResponse> {
    const req: BaseRequest = this.httpService.toRequest([this.BASE_PATH, 'get-details']);
    return this.httpService.get(req)
      .pipe(
        map(data => new MemberUpdateDetailsResponse(data))
      );
  }

  public updateDetail(payload: UpdateDetailPayload): Observable<MemberUpdateDetailsResponse> {
    const req: BaseRequest = this.httpService.toRequest([this.BASE_PATH, 'update-details']);
    return this.httpService.update(req)
      .pipe(
        map(data => new MemberUpdateDetailsResponse(data))
      );
  }
}
