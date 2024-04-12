import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {CommentView, ReplyView} from "@app/model/view/discussion";
import {FormControl} from "@angular/forms";
import {ContributorService} from "@app/feature/contributor/service";
import {SubmitReplyResponse} from "@app/model/response/video";
import {ErrorResponse} from "@app/model/response";
import {ReplyState, ReplyStateMap} from "@app/model/type";
import {defaultReplyState} from "@app/model/default";
import {isFalsy, isObject} from "@app/shared/helper";
import {BaseFormImplComponent} from "@app/base/component";

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CommentComponent extends BaseFormImplComponent implements OnInit {

  public replyState: ReplyStateMap = {};

  @Input('comments')
  public comments: CommentView[] = [];

  @Input('new-comment')
  set comment(comment: CommentView | null) {
    if (comment !== null && isObject(comment)) {
      this.replyState[comment.commentId] = { ...defaultReplyState };
    }
  }

  public constructor(
      protected readonly contributorService: ContributorService) {
    super();
  }

  public ngOnInit(): void {
    this.comments.forEach((comment: CommentView): void => { this.replyState[comment.commentId] = { ...defaultReplyState }; });
  }

  public trackByFn(index: number, item: CommentView): any {
    return item.commentId;
  }

  toggleReplyForm(comment: CommentView): void {
    this.getReplyState(comment).showForm = !this.getReplyState(comment).showForm;
  }

  public submitReply(comment: CommentView): void {
    const replyState: ReplyState = this.getReplyState(comment);
    replyState.clearErrors();
    if (isFalsy(replyState.isSubmitting) && replyState.replyContent.valid) {
      replyState.disableSubmitting();
      replyState.clearMessage();

      this.contributorService
        .replyToComment(comment.fleenVideo.videoId, comment.commentId, { content: replyState.replyContent.value })
        .subscribe({
          next: (result: SubmitReplyResponse): void => {
            replyState.message = result.message;
            replyState.enableIsSubmittingSuccessful();
            replyState.hideForm();

            this.resetReplyForm(replyState.replyContent);
            this.updateCommentReplyList(comment, result.reply);
            this.invokeCallbackWithDelay((): void => { replyState.disableIsSubmittingSuccessful(); })
          },
          error: (error: ErrorResponse): void => {
            this.handleFieldError(replyState.replyContent, error);
            replyState.enableSubmitting();
          },
          complete: (): void => { replyState.enableSubmitting(); }
      });
    }
  }

  public updateCommentReplyList(comment: CommentView, reply: ReplyView): void {
    if (comment != null && reply != null) {
      comment.replies.unshift(reply);
      comment.replies = [ ...comment.replies ];
      this.comments = [ ...this.comments ];
    }
  }

  public cancelReply(comment: CommentView): void {
    const replyState: ReplyState = this.getReplyState(comment);
    this.resetReplyForm(replyState.replyContent);
    replyState.hideForm();
  }

  public resetReplyForm(resetForm: FormControl): void {
    if (resetForm != null) {
      resetForm.reset();
    }
  }

  public getReplyState(comment: CommentView): ReplyState {
    return this.replyState[comment.commentId];
  }

  public replyCtrl(comment: CommentView): FormControl {
    return this.getReplyState(comment).replyContent;
  }

  public showReplyForm(comment: CommentView): boolean {
    return this.getReplyState(comment).showForm;
  }

}
