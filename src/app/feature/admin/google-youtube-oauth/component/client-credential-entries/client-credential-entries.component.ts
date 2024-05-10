import {Component, OnInit} from '@angular/core';
import {BaseEntriesComponent} from "@app/base/component";
import {GoogleClientCredentialView} from "@app/model/youtube/oauth";
import {AnyObject, DeleteIdsPayload, SearchFilter} from "@app/model/type";
import {SEARCH_FILTER_DEFAULT} from "@app/constant/search-filter.const";
import {GoogleYoutubeOauthService} from "@app/feature/admin/google-youtube-oauth/service";
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from "@angular/common";
import {Observable} from "rxjs";
import {SearchResultView} from "@app/model/view";
import {ANY_EMPTY} from "@app/constant";
import {faEye, faPlus, IconDefinition} from "@fortawesome/free-solid-svg-icons";
import {isTruthy} from "@app/shared/helper";

@Component({
  selector: 'app-client-credential-entries',
  templateUrl: './client-credential-entries.component.html',
  styleUrls: ['./client-credential-entries.component.css']
})
export class ClientCredentialEntriesComponent extends BaseEntriesComponent<GoogleClientCredentialView> implements OnInit {

  public override entries: GoogleClientCredentialView[] = [];
  public override searchFilter: SearchFilter[] = SEARCH_FILTER_DEFAULT;

  public constructor(
    protected googleYoutubeOauthService: GoogleYoutubeOauthService,
    router: Router,
    route: ActivatedRoute,
    location: Location) {
    super(router, route, location);
  }

  public ngOnInit(): void {
    this.enableLoading();
    this.startComponent();
  }

  override findEntries(params: AnyObject): Observable<SearchResultView<GoogleClientCredentialView>> {
    return this.googleYoutubeOauthService.findCredentials(params);
  }

  override deleteEntries(payload: DeleteIdsPayload): Observable<any> {
    return ANY_EMPTY;
  }

  public async viewChannels(id: number | string | undefined): Promise<void> {
    if (isTruthy(id)) {
      await this.router.navigate(['..', 'channel-entries', id], { relativeTo: this.route });
    }
  }

  public async addChannelOrRefreshToken(id: number | string | undefined): Promise<void> {
    if (isTruthy(id)) {
      await this.router.navigate(['..', 'add-channel-refresh-token'], { relativeTo: this.route, queryParams: { id } });
    }
  }

  protected readonly faEye: IconDefinition = faEye;
  protected readonly faPlus = faPlus;
}
