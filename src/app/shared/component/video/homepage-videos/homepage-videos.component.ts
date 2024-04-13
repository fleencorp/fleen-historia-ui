import {Component, OnInit} from '@angular/core';
import {BaseVideosComponent} from "@app/base/component/video";
import {UserVideoService} from "@app/feature/user-video/service";
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from "@angular/common";
import {AnyObject, SearchFilter} from "@app/model/type";
import {Observable} from "rxjs";
import {SearchResultView} from "@app/model/view";
import {FleenVideoView} from "@app/model/view/video";
import {faEye, IconDefinition} from "@fortawesome/free-solid-svg-icons";
import {SEARCH_FILTER_VIEW_USER_FLEEN_VIDEOS} from "@app/constant/search-filter.const";

@Component({
  selector: 'app-homepage-videos',
  templateUrl: './homepage-videos.component.html',
  styleUrls: ['./homepage-videos.component.css']
})
export class HomepageVideosComponent extends BaseVideosComponent implements OnInit {

  public override searchFilter: SearchFilter[] = SEARCH_FILTER_VIEW_USER_FLEEN_VIDEOS;

  public constructor(
      protected userVideoService: UserVideoService,
      router: Router,
      route: ActivatedRoute,
      location: Location) {
    super(userVideoService, router, route, location);
  }

  public ngOnInit(): void {
    this.enableLoading();
    this.startComponent();
  }

  public override findEntries(params: AnyObject): Observable<SearchResultView<FleenVideoView>> {
    return this.userVideoService.findHomepageVideos(params);
  }

  protected readonly faEye: IconDefinition = faEye;
}
