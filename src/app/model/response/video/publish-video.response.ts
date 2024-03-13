import {FleenResponse} from "@app/model/response";
import {FleenVideoView} from "@app/model/view/video";

export class PublishVideoResponse extends FleenResponse {

  public readonly fleenVideoView: FleenVideoView;

  public constructor(data: PublishVideoResponse) {
    super(data);
    this.fleenVideoView = data?.fleenVideoView;
  }
}
