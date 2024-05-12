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
import {AnyObject} from "@app/model/type";

export abstract class BaseVideoComponent extends BaseDetailComponent<FleenVideoView> {

  public override entryView!: FleenVideoView;
  public discussion: VideoCommentResponse = new VideoCommentResponse({} as VideoCommentResponse);
  public reviewHistory: VideoReviewHistoryResponse = new VideoReviewHistoryResponse({} as VideoReviewHistoryResponse);
  public hasSubmittedReview: boolean = true;
  protected override formBuilder;
  protected isDetailsView: boolean = true;
  protected isCommentsView: boolean = false;
  protected isReviewHistoryView: boolean = false;
  public isCommentNavigationInProgress: boolean = false;

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

  /**
   * Enables the flag indicating that a comment submission is in progress.
   */
  protected enableIsSubmittingComment(): void {
    this.isSubmittingComment = false;
  }

  /**
   * Disables the flag indicating that a comment submission is in progress.
   */
  protected disableIsSubmittingComment(): void {
    this.isSubmittingComment = true;
  }

  /**
   * Enables the flag indicating that a comment submission was successful.
   */
  protected enableIsSubmittingCommentSuccessful(): void {
    this.isSubmittingCommentSuccessful = true;
  }

  /**
   * Disables the flag indicating that a comment submission was successful.
   */
  protected disableIsSubmittingCommentSuccessful(): void {
    this.isSubmittingCommentSuccessful = false;
  }

  /**
   * Confirms whether the user has submitted a review based on the provided condition.
   *
   * @param canSubmit - A boolean indicating whether the user can submit a review.
   */
  protected confirmUserHasSubmittedReview(canSubmit: boolean): void {
    this.hasSubmittedReview = canSubmit;
  }

  /**
   * Enables the flag indicating that comment navigation is in progress.
   */
  protected enableIsCommentNavigationInProgress(): void {
    this.isCommentNavigationInProgress = true;
  }

  /**
   * Disables the flag indicating that comment navigation is in progress.
   */
  protected disableIsCommentNavigationInProgress(): void {
    this.isCommentNavigationInProgress = false;
  }


  /**
   * Retrieves the video review history for the current entry.
   * Fetches the review history data from the video service based on the current entry ID.
   * Updates the 'reviewHistory' property with the fetched data upon successful retrieval.
   * Handles errors by invoking the 'handleError' method to manage error responses.
   */
  protected getVideoReviewHistory(): void {
    this.videoService.findVideoReviewHistory(this.entryId)
      .subscribe({
        next: (result: VideoReviewHistoryResponse): void => { this.reviewHistory = result; }, // Update 'reviewHistory' property
        error: (error: ErrorResponse): void => { this.handleError(error); } // Handle error
      });
  }

  /**
   * Retrieves the video discussion data for the current entry.
   * Requests the discussion data from the video service based on the current entry ID.
   * Assigns the fetched discussion data to the 'discussion' property upon successful retrieval.
   * Manages errors by calling the 'handleError' method to handle error responses appropriately.
   */
  protected getVideoDiscussion(): void {
    this.videoService.findVideoDiscussion(this.entryId)
      .subscribe({
        next: (result: VideoCommentResponse): void => { this.discussion = result; }, // Update 'discussion' property
        error: (error: ErrorResponse): void => { this.handleError(error); } // Handle error
      });
  }


  /**
   * Adds a comment to the video.
   * Checks if the comment submission is not already in progress and if the comment content is valid.
   * Clears any existing messages in the comment form and disables comment submission to prevent multiple submissions.
   * Submits the comment to the video service and adds it to the comment list upon success.
   * Handles errors by displaying error messages and re-enabling comment submission.
   * Re-enables comment submission and general submitting state after completion.
   */
  public addComment(): void {
    if (isFalsy(this.isSubmittingComment) && this.content.valid) {
      // Clear any existing messages in the comment form
      this.clearCommentFormMessages();

      // Disable comment submission to prevent multiple submissions
      this.disableIsSubmittingComment();

      // Submit the comment to the video service and add it to the comment list
      this.videoService.submitAndAddComment(this.fleenVideo.fleenVideoId, { content: this.content.value })
        .subscribe({
          next: (result: SubmitCommentResponse): void => {
            // Set status message and update comment list upon successful submission
            this.commentFormStatusMessage = result.message;
            this.updateCommentList(result.comment);

            // Re-enable comment submission and general submitting state after completion
            this.enableIsSubmittingComment();
            this.enableSubmitting();

            // Enable successful comment submission and disable it after a delay
            this.enableIsSubmittingCommentSuccessful();
            this.invokeCallbackWithDelay((): void => {
              this.disableIsSubmittingCommentSuccessful();
            });
          },
          error: (error: ErrorResponse): void => {
            // Handle error response by displaying error message and re-enabling comment submission
            this.commentFormErrorMessage = error.message;
            this.handleFieldError(this.content, error);

            // Re-enable comment submission and general submitting state after completion
            this.enableIsSubmittingComment();
            this.enableSubmitting();
          }
      });
    }
  }


  /**
   * Retrieves and displays new comments for the video based on the provided pagination data.
   * Checks if comment navigation is not already in progress before initiating the request.
   * Enables comment navigation in progress state to prevent concurrent requests.
   * Calls the video service to fetch new comments for the video discussion.
   * Updates the discussion with the new comments upon successful retrieval.
   * Handles errors by invoking the 'handleError' method to manage error responses.
   * Disables comment navigation in progress state after completing the request.
   *
   * @param pagination - The pagination data to determine the page and size of comments to retrieve.
   */
  public showNewComments(pagination: AnyObject): void {
    if (isFalsy(this.isCommentNavigationInProgress)) {
      // Enable comment navigation in progress state
      this.enableIsCommentNavigationInProgress();

      // Call the video service to find new comments for the video discussion
      this.videoService.findVideoDiscussion(this.entryId, pagination)
        .subscribe({
          // Update discussion with new comments upon successful retrieval
          next: (result: VideoCommentResponse): void => {
            this.discussion = result;
            // Disable comment navigation in progress state after completing the request
            this.disableIsCommentNavigationInProgress();
          },
          // Handle error response
          error: (error: ErrorResponse): void => {
            this.handleError(error);
            this.disableIsCommentNavigationInProgress();
          }
      });
    }
  }

  /**
   * Updates the comment list with a new comment.
   * Adds the new comment to the beginning of the comments list.
   * Updates the discussion comments array with the new list to trigger UI update.
   *
   * @param comment - The new comment to be added to the comment list.
   */
  public updateCommentList(comment: CommentView): void {
    // Set the new comment
    this.setNewComment(comment);
    // Add the new comment to the beginning of the comments list
    this.discussion.comments.values.unshift(comment);
    // Update the discussion comments array to trigger UI update
    this.discussion.comments.values = [...this.discussion.comments.values];
  }


  /**
   * Sets the newly added comment for display.
   *
   * @param comment - The newly added comment to be displayed.
   */
  public setNewComment(comment: CommentView): void {
    this.addedComment = comment;
  }

  /**
   * Clears any existing messages in the comment form.
   */
  protected clearCommentFormMessages(): void {
    this.commentFormErrorMessage = '';
    this.commentFormStatusMessage = '';
  }

  /**
   * Switches the view to the details view.
   */
  public detailsView(): void {
    this.isCommentsView = false;
    this.isReviewHistoryView = false;
    this.isDetailsView = true;
  }

  /**
   * Switches the view to the comments view.
   */
  public commentsView(): void {
    this.isDetailsView = false;
    this.isReviewHistoryView = false;
    this.isCommentsView = true;
  }

  /**
   * Switches the view to the review history view.
   */
  public reviewHistoryView(): void {
    this.isDetailsView = false;
    this.isCommentsView = false;
    this.isReviewHistoryView = true;
  }


  get fleenVideo(): FleenVideoView {
    return this.entryView;
  }
}
