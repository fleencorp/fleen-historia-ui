export class UserCanSubmitReviewResponse {
  public readonly canSubmitVideoReview: boolean;

  public constructor(data: UserCanSubmitReviewResponse) {
    this.canSubmitVideoReview = data?.canSubmitVideoReview ? data.canSubmitVideoReview : false;
  }
}
