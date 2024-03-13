import {FleenResponse} from "@app/model/response";

export class RequestForReviewResponse extends FleenResponse {

  public readonly fleenVideoView;

  public constructor(data: RequestForReviewResponse) {
    super(data);
    this.fleenVideoView = data?.fleenVideoView;
  }
}
