import {BaseDetailComponent} from "@app/base/component";
import {FleenVideoView} from "@app/model/view/video";
import {SubmitCommentResponse, VideoCommentResponse, VideoReviewHistoryResponse} from "@app/model/response/video";
import {UserVideoService} from "@app/feature/user-video/service";
import {ActivatedRoute, Router} from "@angular/router";
import {ContributorService} from "@app/feature/contributor/service";
import {ErrorResponse} from "@app/model/response";
import {FormControl} from "@angular/forms";
import {maxLength, required} from "@app/shared/validator";
import {CommentView} from "@app/model/view/discussion";
import {isFalsy} from "@app/shared/helper";

export abstract class BaseVideoComponent extends BaseDetailComponent<FleenVideoView> {

  public override entryView!: FleenVideoView;
  public discussion: VideoCommentResponse = new VideoCommentResponse({} as VideoCommentResponse);
  public reviewHistory: VideoReviewHistoryResponse = new VideoReviewHistoryResponse({} as VideoReviewHistoryResponse);
  public hasSubmittedReview: boolean = true;
  protected override formBuilder;
  protected isDetailsView: boolean = true;
  protected isCommentsView: boolean = false;
  protected isReviewHistoryView: boolean = false;

  public content: FormControl = new FormControl<any>('', [required, maxLength(3000)]);
  public addedComment: CommentView | null = null;
  public commentFormErrorMessage: string = '';
  public commentFormStatusMessage: string = '';
  public isSubmittingComment: boolean = false;
  public isSubmittingCommentSuccessful: boolean = false;


  protected constructor(
    protected videoService: UserVideoService | ContributorService,
    router: Router,
    route: ActivatedRoute) {
    super(router, route);
  }

  protected enableIsSubmittingComment(): void {
    this.isSubmittingComment = false;
  }

  protected disableIsSubmittingComment(): void {
    this.isSubmittingComment = true;
  }

  protected enableIsSubmittingCommentSuccessful(): void {
    this.isSubmittingCommentSuccessful = true;
  }

  protected disableIsSubmittingCommentSuccessful(): void {
    this.isSubmittingCommentSuccessful = false;
  }

  protected confirmUserHasSubmittedReview(canSubmit: boolean): void {
    this.hasSubmittedReview = canSubmit;
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

  public addComment(): void {
    if (isFalsy(this.isSubmittingComment) && this.content.valid) {
      this.clearCommentFormMessages();
      this.disableIsSubmittingComment();

      this.videoService.submitAndAddComment(this.fleenVideo.videoId, {content: this.content.value})
        .subscribe({
          next: (result: SubmitCommentResponse): void => {
            this.commentFormStatusMessage = result.message;
            this.updateCommentList(result.comment);
            this.enableIsSubmittingCommentSuccessful();
            this.invokeCallbackWithDelay(this.disableIsSubmittingCommentSuccessful.bind(this));
          },
          error: (error: ErrorResponse): void => {
            this.commentFormErrorMessage = error.message;
            this.handleFieldError(this.content, error);
            this.enableIsSubmittingComment();
          },
          complete: (): void => {
            this.enableIsSubmittingComment();
            this.enableSubmitting();
          }
        });
    }
  }

  public updateCommentList(comment: CommentView): void {
    this.setNewComment(comment);
    this.discussion.comments.values.unshift(comment);
    this.discussion.comments.values = [...this.discussion.comments.values];
  }

  public setNewComment(comment: CommentView): void {
    this.addedComment = comment;
  }

  protected clearCommentFormMessages(): void {
    this.commentFormErrorMessage = '';
    this.commentFormStatusMessage = '';
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
