import {Injectable} from '@angular/core';
import {HttpClientService} from "@app/shared/service/impl";
import {AnyObject, BaseRequest, CreateCategoryPayload, DeleteIdsPayload, UpdateCategoryPayload} from "@app/model/type";
import {Observable} from "rxjs";
import {SearchResultView} from "@app/model/view";
import {CategoryView} from "@app/model/view/category";
import {toSearchResult} from "@app/shared/rxjs";
import {DeleteResponse} from "@app/model/response/common";
import {MemberView} from "@app/model/view/member";
import {UpdateMemberRolePayload, UpdateMemberStatusPayload} from "@app/model/type/member.type";
import {FleenResponse} from "@app/model/response";
import {AvailableUserRoleResponse} from "@app/model/response/member/member.response";

@Injectable()
export class AdminMemberService {

  private readonly BASE_PATH: string = "admin/member";

  constructor(
    private httpService: HttpClientService) { }


  public findMembers(params: AnyObject): Observable<SearchResultView<MemberView>> {
    const req: BaseRequest = this.httpService.toRequest([this.BASE_PATH, 'entries'], params);
    return this.httpService.get(req)
      .pipe(
        toSearchResult(MemberView),
      );
  }

  public findMember(id: number | string): Observable<MemberView> {
    const req: BaseRequest = this.httpService.toRequest([this.BASE_PATH, 'detail', +id]);
    return this.httpService.get(req, MemberView);
  }

  public addCategory(body: CreateCategoryPayload): Observable<CategoryView> {
    const req: BaseRequest = this.httpService.toRequest([this.BASE_PATH, 'add'], null, { ...body });
    return this.httpService.post(req, CategoryView);
  }

  public updateMemberStatus(memberId: number | string, body: UpdateMemberStatusPayload): Observable<FleenResponse> {
    const req: BaseRequest = this.httpService.toRequest([this.BASE_PATH, 'update-member-status', +memberId], null, { ...body });
    return this.httpService.update(req, FleenResponse);
  }

  public getAvailableUserRoles(): Observable<AvailableUserRoleResponse> {
    const req: BaseRequest = this.httpService.toRequest([this.BASE_PATH, 'available-user-roles']);
    return this.httpService.get(req, AvailableUserRoleResponse);
  }

  public updateMemberRole(id: number | string, body: UpdateMemberRolePayload): Observable<FleenResponse> {
    const req: BaseRequest = this.httpService.toRequest([this.BASE_PATH, 'update-role', +id], null, { ...body });
    return this.httpService.update(req, FleenResponse);
  }

  public deleteCategory(id: number | string): Observable<DeleteResponse> {
    const req: BaseRequest = this.httpService.toRequest([this.BASE_PATH, 'delete', +id]);
    return this.httpService.delete(req, DeleteResponse);
  }

  public deleteManyCategories(body: DeleteIdsPayload): Observable<DeleteResponse> {
    const req: BaseRequest = this.httpService.toRequest([this.BASE_PATH, 'delete', 'many'], null, { ...body });
    return this.httpService.deleteMany(req, DeleteResponse);
  }
}
