export class UserCanSubmitReviewResponse {
  public readonly hasSubmittedReview: boolean;

  public constructor(data: UserCanSubmitReviewResponse) {
    this.hasSubmittedReview = data?.hasSubmittedReview ? data.hasSubmittedReview : data.hasSubmittedReview;
  }
}
