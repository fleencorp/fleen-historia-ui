import {FleenVideoView} from "@app/model/view/video";
import {CommentView} from "@app/model/view/discussion/comment.view";

export class VideoCommentResponse {

  public readonly fleenVideo: FleenVideoView;
  public readonly comments: CommentView[];

  public constructor(data: VideoCommentResponse) {
    this.fleenVideo = data?.fleenVideo ? new FleenVideoView(data.fleenVideo) : data.fleenVideo;
    this.comments = data?.comments ?
  }
}
