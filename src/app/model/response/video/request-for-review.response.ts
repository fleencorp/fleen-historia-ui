import {FleenResponse} from "@app/model/response";
import {FleenVideoView} from "@app/model/view/video";

export class RequestForReviewResponse extends FleenResponse {

  public readonly fleenVideo: FleenVideoView;

  public constructor(data: RequestForReviewResponse) {
    super(data);
    this.fleenVideo = data?.fleenVideo;
  }
}
