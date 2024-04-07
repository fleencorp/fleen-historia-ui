import {BaseEntriesComponent} from "@app/base/component";
import {FleenVideoView} from "@app/model/view/video";
import {AnyObject, DeleteIdsPayload, SearchFilter, SearchPayload} from "@app/model/type";
import {SEARCH_FILTER_VIEW_FLEEN_VIDEOS} from "@app/constant/search-filter.const";
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from "@angular/common";
import {Observable} from "rxjs";
import {SearchResultView} from "@app/model/view";
import {ANY_EMPTY, VIDEO_STATUS_SEARCH_KEY} from "@app/constant";
import {isFalsy, isTruthy, removeProperty} from "@app/shared/helper";
import {VideoStatus} from "@app/model/enum";
import {PublishVideoResponse, RequestForReviewResponse} from "@app/model/response/video";
import {ErrorResponse} from "@app/model/response";
import {BaseVideoService} from "@app/base/service";

export abstract class BaseVideosComponent extends BaseEntriesComponent<FleenVideoView> {

  public override entries: FleenVideoView[] = [];
  public override searchFilter: SearchFilter[] = SEARCH_FILTER_VIEW_FLEEN_VIDEOS;
  protected override defaultEntryIdKey: string = 'videoId';

  protected constructor(
      protected videosService: BaseVideoService,
      router: Router,
      route: ActivatedRoute,
      location: Location) {
    super(router, route, location);
  }

  public override findEntries(params: AnyObject): Observable<SearchResultView<FleenVideoView>> {
    return this.videosService.findVideos(params);
  }

  public override deleteEntries(payload: DeleteIdsPayload): Observable<any> {
    return ANY_EMPTY;
  }

  public override trackByFn(index: number, item: FleenVideoView): any {
    return item.videoId;
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

  public override async search(payload: SearchPayload): Promise<void> {
    payload[VIDEO_STATUS_SEARCH_KEY] = this.currentVideoSearchStatus;
    await super.search(payload);
  }

  protected setDefaultVideoSearchStatus(): void {
    this.searchParams = { ...(this.searchParams) };
    if (!this.searchParams.hasOwnProperty(VIDEO_STATUS_SEARCH_KEY)) {
      this.searchParams[VIDEO_STATUS_SEARCH_KEY] = VideoStatus.IN_REVIEW;
    }
  }

  public setVideoStatusSearchParam(status: VideoStatus): void {
    const currentStatus: VideoStatus = this.searchParams[VIDEO_STATUS_SEARCH_KEY];
    if (currentStatus === status) {
      removeProperty(this.searchParams, VIDEO_STATUS_SEARCH_KEY);
    } else {
      this.searchParams = { ...(this.searchParams), status };
    }
  }

  get currentVideoSearchStatus(): VideoStatus {
    return this.searchParams[VIDEO_STATUS_SEARCH_KEY];
  }

}
