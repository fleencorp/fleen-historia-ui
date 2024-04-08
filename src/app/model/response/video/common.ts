export class UserCanSubmitReviewResponse {
  public readonly hasSubmittedReview: boolean;

  public constructor(data: UserCanSubmitReviewResponse) {
    this.hasSubmittedReview = data?.hasSubmittedReview ? data.hasSubmittedReview : data.hasSubmittedReview;
  }
}

export class MoveToDraftResponse {

  public readonly movedToDraft: boolean;

  public constructor(data: MoveToDraftResponse) {
    this.movedToDraft = data?.movedToDraft;
  }
}
