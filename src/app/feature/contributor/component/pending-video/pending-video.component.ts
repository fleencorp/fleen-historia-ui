import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FleenVideoView} from "@app/model/view/video";
import {ActivatedRoute, Router} from "@angular/router";
import {Observable} from "rxjs";
import {ContributorService} from "@app/feature/contributor/service";
import {enumValid, maxLength, required} from "@app/shared/validator";
import {VideoReviewStatus} from "@app/model/enum";
import {AbstractControl, FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {isFalsy} from "@app/shared/helper";
import {ErrorResponse} from "@app/model/response";
import {SubmitCommentResponse, SubmitVideoReviewResponse, UserCanSubmitReviewResponse} from "@app/model/response/video";
import {BaseVideoComponent} from "@app/base/component/video";
import {CommentView} from "@app/model/view/discussion";

@Component({
  selector: 'app-pending-video',
  templateUrl: './pending-video.component.html',
  styleUrls: ['./pending-video.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PendingVideoComponent extends BaseVideoComponent implements OnInit {

  public content: FormControl = new FormControl<any>('', [required, maxLength(3000)]);
  public addedComment: CommentView | null = null;
  public commentFormErrorMessage: string = '';
  public commentFormStatusMessage: string = '';
  public isSubmittingComment: boolean = false;
  public isSubmittingCommentSuccessful: boolean = false;

  public constructor(protected contributorService: ContributorService,
                     formBuilder: FormBuilder,
                     router: Router,
                     route: ActivatedRoute) {
    super(contributorService, router, route);
    this.formBuilder = formBuilder;
  }

  public async ngOnInit(): Promise<void> {
    this.enableLoading();
    await this.initEntry(this.checkCanUserSubmitAVideoReview.bind(this));
    this.getVideoReviewHistory();
    this.getVideoDiscussion();
  }

  protected override initForm(): void {
    this.fleenForm = this.formBuilder.group({
      videoReviewStatus: ['', [required, enumValid(VideoReviewStatus)]],
      comment: ['', [maxLength(3000)]]
    });
    this.formReady();
  }

  protected override getServiceEntry(id: number | string): Observable<FleenVideoView> {
    return this.contributorService.findPendingVideo(id);
  }

  public submitReview(): void {
    if (isFalsy(this.isSubmitting) && this.fleenForm.valid) {
      this.disableSubmittingAndResetErrorMessage();
      this.clearMessages();

      this.contributorService.submitVideoReview(this.entryView.videoId, this.fleenForm.value)
        .subscribe({
          next: (result: SubmitVideoReviewResponse): void => {
            this.setStatusMessage(result.message);
            this.confirmUserHasSubmittedReview(true);
          },
          error: (error: ErrorResponse): void => { this.handleError(error); },
          complete: (): void => { this.enableSubmitting(); }
      });
    }
  }

  public addComment(): void {
    if (isFalsy(this.isSubmittingComment) && this.content.valid) {
      this.clearCommentFormMessages();
      this.disableIsSubmittingComment();

      this.contributorService.submitAndAddComment(this.fleenVideo.videoId, {content: this.content.value})
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

  private checkCanUserSubmitAVideoReview(): void {
    this.contributorService.userCanSubmitVideoReview(this.entryId)
      .subscribe({
        next: (result: UserCanSubmitReviewResponse): void => { this.confirmUserHasSubmittedReview(result.hasSubmittedReview); },
        error: (error: ErrorResponse): void => { this.handleError(error); }
    });
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

  private confirmUserHasSubmittedReview(canSubmit: boolean): void {
    this.hasSubmittedReview = canSubmit;
  }

  get canSubmitReview(): boolean {
    return !(this.hasSubmittedReview);
  }

  get submitReviewForm(): FormGroup {
    return this.fleenForm;
  }

  get comment(): AbstractControl | null | undefined {
    return this.submitReviewForm?.get('comment');
  }
}
