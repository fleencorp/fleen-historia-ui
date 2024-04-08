import {FleenResponse} from "@app/model/response";

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
