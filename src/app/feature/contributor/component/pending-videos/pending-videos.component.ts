import {Component, OnInit} from '@angular/core';
import {BaseEntriesComponent} from "@app/base/component";
import {FleenVideoView} from "@app/model/view/video";
import {AnyObject, DeleteIdsPayload, SearchFilter} from "@app/model/type";
import {SEARCH_FILTER_VIEW_FLEEN_VIDEOS} from "@app/constant/search-filter.const";
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from "@angular/common";
import {Observable} from "rxjs";
import {SearchResultView} from "@app/model/view";
import {ANY_EMPTY} from "@app/constant";
import {ContributorService} from "@app/feature/contributor/service";
import {faCheckDouble, faEye, IconDefinition} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-pending-videos',
  templateUrl: './pending-videos.component.html',
  styleUrls: ['./pending-videos.component.css']
})
export class PendingVideosComponent extends BaseEntriesComponent<FleenVideoView> implements OnInit {

  public override entries: FleenVideoView[] = [];
  public override searchFilter: SearchFilter[] = SEARCH_FILTER_VIEW_FLEEN_VIDEOS;

  public constructor(protected contributorService: ContributorService,
                     router: Router,
                     route: ActivatedRoute,
                     location: Location) {
    super(router, route, location);
  }

  public ngOnInit(): void {
    this.enableLoading();
    this.startComponent();
  }

  override findEntries(params: AnyObject): Observable<SearchResultView<FleenVideoView>> {
    return this.contributorService.findPendingVideos(params);
  }


  override deleteEntries(payload: DeleteIdsPayload): Observable<any> {
    return ANY_EMPTY;
  }

  protected readonly faCheckDouble: IconDefinition = faCheckDouble;
  protected readonly faEye: IconDefinition = faEye;
}
