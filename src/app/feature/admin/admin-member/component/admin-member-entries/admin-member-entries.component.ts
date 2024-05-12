import {Component, OnInit} from '@angular/core';
import {BaseEntriesComponent} from "@app/base/component";
import {AnyObject, DeleteIdsPayload, SearchFilter, SearchPayload} from "@app/model/type";
import {SEARCH_FILTER_VIEW_MEMBER} from "@app/constant/search-filter.const";
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from "@angular/common";
import {Observable} from "rxjs";
import {SearchResultView} from "@app/model/view";
import {DeleteResponse} from "@app/model/response/common";
import {AdminMemberService} from "@app/feature/admin/admin-member/service";
import {MemberView} from "@app/model/view/member";
import {ANY_EMPTY} from "@app/constant";
import {removeProperty} from "@app/shared/helper";

@Component({
  selector: 'app-admin-member-entries',
  templateUrl: './admin-member-entries.component.html',
  styleUrl: './admin-member-entries.component.css'
})
export class AdminMemberEntriesComponent extends BaseEntriesComponent<MemberView> implements OnInit {

  public override entries: MemberView[] = [];
  public override searchFilter: SearchFilter[] = SEARCH_FILTER_VIEW_MEMBER;
  public override defaultEntryIdKey: string = 'memberId';

  public constructor(
      protected adminMemberService: AdminMemberService,
      router: Router,
      route: ActivatedRoute,
      location: Location) {
    super(router, route, location);
  }

  public ngOnInit(): void {
    this.enableLoading();
    this.startComponent();
  }

  public override async search(payload: SearchPayload): Promise<void> {
    removeProperty(payload, 'q');
    console.log(payload);
    await super.search(payload);
  }

  public override findEntries(params: AnyObject): Observable<SearchResultView<MemberView>> {
    return this.adminMemberService.findMembers(params);
  }

  public override deleteEntryMethod(id: number | string): Observable<DeleteResponse> {
    return ANY_EMPTY;
  }

  public override deleteEntries(payload: DeleteIdsPayload): Observable<DeleteResponse> {
    return ANY_EMPTY;
  }
}
