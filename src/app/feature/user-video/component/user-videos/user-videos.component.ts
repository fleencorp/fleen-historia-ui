  import {Component, OnInit} from '@angular/core';
import {FleenVideoView} from "@app/model/view/video";
import {AnyObject, DeleteIdsPayload, SearchFilter} from "@app/model/type";
import {SEARCH_FILTER_VIEW_FLEEN_VIDEOS} from "@app/constant/search-filter.const";
import {ActivatedRoute, Router} from "@angular/router";
import {Observable} from "rxjs";
import {Location} from "@angular/common";
import {SearchResultView} from "@app/model/view";
import {ANY_EMPTY} from "@app/constant";
import {BaseVideosComponent} from "@app/base/component/video";
import {UserVideoService} from "@app/feature/user-video/service";

@Component({
  selector: 'app-user-videos',
  templateUrl: './user-videos.component.html',
  styleUrls: ['./user-videos.component.css']
})
export class UserVideosComponent extends BaseVideosComponent implements OnInit {

  public override entries: FleenVideoView[] = [];
  public override searchFilter: SearchFilter[] = SEARCH_FILTER_VIEW_FLEEN_VIDEOS;

  public constructor(
      protected userVideoService: UserVideoService,
      router: Router,
      route: ActivatedRoute,
      location: Location) {
    super(userVideoService, router, route, location);
  }

  public ngOnInit(): void {
    this.startComponent();
  }

  override findEntries(params: AnyObject): Observable<SearchResultView<FleenVideoView>> {
    return this.userVideoService.findVideos(params);
  }

  override deleteEntries(payload: DeleteIdsPayload): Observable<any> {
    return ANY_EMPTY;
  }

}
