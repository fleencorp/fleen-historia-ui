import {BaseEntriesComponent} from "@app/base/component";
import {FleenVideoView} from "@app/model/view/video";
import {OnInit} from "@angular/core";
import {AnyObject, DeleteIdsPayload, SearchFilter} from "@app/model/type";
import {SEARCH_FILTER_VIEW_FLEEN_VIDEOS} from "@app/constant/search-filter.const";
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from "@angular/common";
import {Observable} from "rxjs";
import {SearchResultView} from "@app/model/view";
import {ANY_EMPTY} from "@app/constant";
import {isFalsy, isTruthy} from "@app/shared/helper";
import {VideoStatus} from "@app/model/enum";
import {PublishVideoResponse, RequestForReviewResponse} from "@app/model/response/video";
import {ErrorResponse} from "@app/model/response";
import {BaseVideoService} from "@app/base/service";

export abstract class BaseVideosComponent extends BaseEntriesComponent<FleenVideoView> implements OnInit {

  public override entries: FleenVideoView[] = [];
  public override searchFilter: SearchFilter[] = SEARCH_FILTER_VIEW_FLEEN_VIDEOS;

  protected constructor(
      protected videosService: BaseVideoService,
      router: Router,
      route: ActivatedRoute,
      location: Location) {
    super(router, route, location);
  }

  public ngOnInit(): void {
    this.startComponent();
  }

  override findEntries(params: AnyObject): Observable<SearchResultView<FleenVideoView>> {
    return this.videosService.findVideos(params);
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
    if (isFalsy(this.isSubmitting)) {
      this.disableSubmittingAndResetErrorMessage();

      this.videosService.requestForReview(videoId)
        .subscribe({
          next: (result: RequestForReviewResponse): void => {
            this.setStatusMessage(result.message);
            this.replaceOldWithUpdateVideo(result.fleenVideoView.videoId, result.fleenVideoView);
          },
          error: (error: ErrorResponse): void => { this.handleError(error); },
          complete: async (): Promise<void> => { this.enableSubmitting(); }
      });
    }
  }

  public publishVideo(id: number | string): void {
    if (isFalsy(this.isSubmitting)) {
      this.disableSubmittingAndResetErrorMessage();

      this.videosService.publishVideo(id)
        .subscribe({
          next: (result: PublishVideoResponse): void => {
            this.setStatusMessage(result.message);
            this.replaceOldWithUpdateVideo(result.fleenVideoView.videoId, result.fleenVideoView);
          },
          error: (error: ErrorResponse): void => { this.handleError(error); },
          complete: async (): Promise<void> => { this.enableSubmitting(); }
      });
    }
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
