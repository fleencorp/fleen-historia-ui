import {FleenResponse} from "@app/model/response";
import {FleenVideoView} from "@app/model/view/video";

export class PublishVideoResponse extends FleenResponse {

  public readonly fleenVideo: FleenVideoView;

  public constructor(data: PublishVideoResponse) {
    super(data);
    this.fleenVideo = data?.fleenVideo;
  }
}
