import {VideoReviewView} from "@app/model/view/video";
import {FleenResponse} from "@app/model/response";

export class SubmitVideoReviewResponse extends FleenResponse {
  public readonly videoReview: VideoReviewView;

  public constructor(data: SubmitVideoReviewResponse) {
    super(data);
    this.videoReview = data?.videoReview;
  }
}
