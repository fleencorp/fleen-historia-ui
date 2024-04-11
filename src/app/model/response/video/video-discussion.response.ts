import {FleenVideoView} from "@app/model/view/video";
import {CommentView} from "@app/model/view/discussion";
import {SearchResultView} from "@app/model/view";

export class VideoCommentResponse {

  public readonly fleenVideo: FleenVideoView;
  public readonly comments: SearchResultView<any>;

  public constructor(data: VideoCommentResponse) {
    this.fleenVideo = data?.fleenVideo ? new FleenVideoView(data.fleenVideo) : data.fleenVideo;
    this.comments = data?.comments ? new SearchResultView(data.comments, CommentView) : new SearchResultView(data?.comments, CommentView);
  }
}
