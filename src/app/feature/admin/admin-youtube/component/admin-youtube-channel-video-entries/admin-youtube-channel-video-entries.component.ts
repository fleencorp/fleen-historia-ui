import {AfterViewInit, Component} from '@angular/core';
import {BaseEntriesComponent} from "@app/base/component";
import {ActivatedRoute, Router} from "@angular/router";
import {Observable} from "rxjs";
import {AdminYoutubeService} from "@app/feature/admin/admin-youtube/service";
import {AnyObject, DeleteIdsPayload, SearchFilter} from "@app/model/type";
import {SEARCH_FILTER_VIEW_FLEEN_VIDEOS} from "@app/constant/search-filter.const";
import {Location} from "@angular/common";
import {SearchResultView} from "@app/model/view";
import {ANY_EMPTY} from "@app/constant";
import {YoutubeVideoResponse} from "@app/model/response/youtube";

@Component({
  selector: 'app-admin-youtube-channel-video-entries',
  templateUrl: './admin-youtube-channel-video-entries.component.html',
  styleUrls: ['./admin-youtube-channel-video-entries.component.css']
})
export class AdminYoutubeChannelVideoEntriesComponent extends BaseEntriesComponent<YoutubeVideoResponse> implements AfterViewInit {

  public override entries: YoutubeVideoResponse[] = [];
  public override searchFilter: SearchFilter[] = SEARCH_FILTER_VIEW_FLEEN_VIDEOS;

  public constructor(
      protected videosService: AdminYoutubeService,
      router: Router,
      route: ActivatedRoute,
      location: Location) {
    super(router, route, location);
  }

  ngAfterViewInit(): void {
    console.log(this.entries);
  }

  override findEntries(params: AnyObject): Observable<SearchResultView<YoutubeVideoResponse>> {
    return this.videosService.findYouTubeChannelVideos(params);
  }

  override deleteEntries(payload: DeleteIdsPayload): Observable<any> {
    return ANY_EMPTY;
  }

}
