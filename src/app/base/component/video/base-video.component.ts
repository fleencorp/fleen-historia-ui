import {BaseDetailComponent} from "@app/base/component";
import {FleenVideoView, VideoReviewView} from "@app/model/view/video";
import {VideoCommentResponse, VideoReviewHistoryResponse} from "@app/model/response/video";
import {UserVideoService} from "@app/feature/user-video/service";
import {ActivatedRoute, Router} from "@angular/router";
import {ContributorService} from "@app/feature/contributor/service";
import {ErrorResponse} from "@app/model/response";

export abstract class BaseVideoComponent extends BaseDetailComponent<FleenVideoView> {

  public override entryView!: FleenVideoView;
  public discussion: VideoCommentResponse = new VideoCommentResponse({} as VideoCommentResponse);
  public reviewHistory: VideoReviewHistoryResponse = new VideoReviewHistoryResponse({} as VideoReviewHistoryResponse);
  public hasSubmittedReview: boolean = true;
  protected override formBuilder;
  protected isDetailsView: boolean = true;
  protected isCommentsView: boolean = false;
  protected isReviewHistoryView: boolean = false;


  protected constructor(
    protected videoService: UserVideoService | ContributorService,
    router: Router,
    route: ActivatedRoute) {
    super(router, route);
  }

  protected getVideoReviewHistory(): void {
    this.videoService.findVideoReviewHistory(this.entryId)
      .subscribe({
        next: (result: VideoReviewHistoryResponse): void => { this.reviewHistory = result; },
        error: (error: ErrorResponse): void => { this.handleError(error); }
      });
  }

  protected getVideoDiscussion(): void {
    this.videoService.findVideoDiscussion(this.entryId)
      .subscribe({
        next: (result: VideoCommentResponse): void => { this.discussion = result; },
        error: (error: ErrorResponse): void => { this.handleError(error); }
    });
  }

  public detailsView(): void {
    this.isCommentsView = false;
    this.isReviewHistoryView = false;
    this.isDetailsView = true;
  }

  public commentsView(): void {
    this.isDetailsView = false;
    this.isReviewHistoryView = false;
    this.isCommentsView = true;
  }

  public reviewHistoryView(): void {
    this.isDetailsView = false;
    this.isCommentsView = false;
    this.isReviewHistoryView = true;
  }

  get fleenVideo(): FleenVideoView {
    return this.entryView;
  }
}
