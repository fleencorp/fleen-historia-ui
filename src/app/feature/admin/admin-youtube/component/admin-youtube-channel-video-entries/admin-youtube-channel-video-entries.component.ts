import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {BaseEntriesComponent} from "@app/base/component";
import {ActivatedRoute, Router} from "@angular/router";
import {Observable} from "rxjs";
import {AdminYoutubeService} from "@app/feature/admin/admin-youtube/service";
import {AnyObject, DeleteIdsPayload, SearchFilter} from "@app/model/type";
import {SEARCH_FILTER_VIEW_FLEEN_VIDEOS} from "@app/constant/search-filter.const";
import {Location} from "@angular/common";
import {SearchResultView} from "@app/model/view";
import {ANY_EMPTY} from "@app/constant";
import {YouTubeCategoryResponse, YoutubeVideoResponse} from "@app/model/response/youtube";

@Component({
  selector: 'app-admin-youtube-channel-video-entries',
  templateUrl: './admin-youtube-channel-video-entries.component.html',
  styleUrls: ['./admin-youtube-channel-video-entries.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AdminYoutubeChannelVideoEntriesComponent extends BaseEntriesComponent<YoutubeVideoResponse> implements OnInit {

  public override entries: YoutubeVideoResponse[] = [];
  public override searchFilter: SearchFilter[] = SEARCH_FILTER_VIEW_FLEEN_VIDEOS;

  public constructor(
      protected videosService: AdminYoutubeService,
      router: Router,
      route: ActivatedRoute,
      location: Location) {
    super(router, route, location);
  }

  public ngOnInit(): void {
    this.startComponent();
  }

  override findEntries(params: AnyObject): Observable<SearchResultView<YoutubeVideoResponse>> {
    return this.videosService.findYouTubeChannelVideos(params);
  }

  override deleteEntries(payload: DeleteIdsPayload): Observable<any> {
    return ANY_EMPTY;
  }

  public deletedVideo(videoId: string): void {
    const index: number = this.entries.findIndex((entry: YoutubeVideoResponse): boolean => entry.videoId === videoId);
    if (index !== -1) {
      this.entries.splice(index, 1);
      this.resetEntries();
    }
  }

}
