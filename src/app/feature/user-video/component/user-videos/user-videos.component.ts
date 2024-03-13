import {Component, OnInit} from '@angular/core';
import {BaseEntriesComponent} from "@app/base/component";
import {FleenVideoView} from "@app/model/view/video";
import {AnyObject, DeleteIdsPayload, SearchFilter} from "@app/model/type";
import {SEARCH_FILTER_VIEW_FLEEN_VIDEOS} from "@app/constant/search-filter.const";
import {ActivatedRoute, Router} from "@angular/router";
import {UserVideoService} from "@app/feature/user-video/service/user-video.service";
import {Observable} from "rxjs";
import {Location} from "@angular/common";
import {SearchResultView} from "@app/model/view";
import {ANY_EMPTY} from "@app/constant";
import {VideoStatus} from "@app/model/enum";
import {isTruthy} from "@app/shared/helper";
import {RequestForReviewResponse} from "@app/model/response/video/request-for-review.response";
import {ErrorResponse} from "@app/model/response";

@Component({
  selector: 'app-user-videos',
  templateUrl: './user-videos.component.html',
  styleUrls: ['./user-videos.component.css']
})
export class UserVideosComponent extends BaseEntriesComponent<FleenVideoView> implements OnInit {

  public override entries: FleenVideoView[] = [];
  public override searchFilter: SearchFilter[] = SEARCH_FILTER_VIEW_FLEEN_VIDEOS;

  public constructor(protected userVideoService: UserVideoService,
                     router: Router,
                     route: ActivatedRoute,
                     location: Location) {
    super(router, route, location);
  }

  public ngOnInit(): void {
    this.startComponent();
  }

  override findEntries(params: AnyObject): Observable<SearchResultView<FleenVideoView>> {
    return this.userVideoService.findUserVideos(params);
  }

  override deleteEntries(payload: DeleteIdsPayload): Observable<any> {
    return ANY_EMPTY;
  }

  public canRequestForReview(video: FleenVideoView): boolean {
    if (isTruthy(video)) {
      return video.videoStatus === VideoStatus.DRAFT
        || video.videoStatus === VideoStatus.DISAPPROVED;
    }
    return false;
  }

  public canPublish(video: FleenVideoView): boolean {
    if (isTruthy(video)) {
      return video.videoStatus === VideoStatus.APPROVED
        && !video.isPublished;
    }
    return false;
  }

  public requestForReview(videoId: number | string): void {
    this.userVideoService.requestForReview(videoId)
      .subscribe({
        next: (result: RequestForReviewResponse): void => {
          this.setStatusMessage(result.message);
          this.replaceOldWithUpdateVideo(result.fleenVideoView.videoId, result.fleenVideoView);
        },
        error: (error: ErrorResponse): void => { this.handleError(error); }
    });
  }

  public publishVideo(id: number | string): void {
    this.userVideoService.requestForReview(id)
      .subscribe({
        next: (result: RequestForReviewResponse): void => { this.setStatusMessage(result.message); },
        error: (error: ErrorResponse): void => { this.handleError(error); }
      });
  }

  private replaceOldWithUpdateVideo(videoId: number | string, newVideo: FleenVideoView): void {
    const videoPositionOrIndex: number = this.entries
      .findIndex((entry: FleenVideoView): boolean => entry.videoId === videoId);
    if (videoPositionOrIndex !== -1) {
      // Update the property of the found entry
      this.entries[videoPositionOrIndex] = newVideo;
    }
    this.entries = [ ...this.entries ];
  }

}
