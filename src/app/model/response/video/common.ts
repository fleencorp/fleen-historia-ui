import {FleenResponse} from "@app/model/response";
import {CommentView} from "@app/model/view/discussion/comment.view";

export class UserCanSubmitReviewResponse {
  public readonly hasSubmittedReview: boolean;

  public constructor(data: UserCanSubmitReviewResponse) {
    this.hasSubmittedReview = data?.hasSubmittedReview ? data.hasSubmittedReview : data.hasSubmittedReview;
  }
}

export class MoveToDraftResponse extends FleenResponse {

  public readonly movedToDraft: boolean;

  public constructor(data: MoveToDraftResponse) {
    super(data);
    this.movedToDraft = data?.movedToDraft;
  }
}

export class SubmitCommentResponse extends FleenResponse {

  public readonly comment: CommentView;

  public constructor(data: SubmitCommentResponse) {
    super(data);
    this.comment = data?.comment;
  }
}
