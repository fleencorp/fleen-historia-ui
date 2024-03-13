import {FleenResponse} from "@app/model/response";
import {FleenVideoView} from "@app/model/view/video";

export class RequestForReviewResponse extends FleenResponse {

  public readonly fleenVideoView: FleenVideoView;

  public constructor(data: RequestForReviewResponse) {
    super(data);
    this.fleenVideoView = data?.fleenVideoView;
  }
}
