import {FleenVideoView} from "@app/model/view/video";
import {MemberView} from "@app/model/view/member";

export class CommentView {

  public readonly commentId: number;
  public readonly fleenVideo: FleenVideoView;
  public readonly member: MemberView;
  public readonly content: string;

  public constructor(data: CommentView) {
    this.commentId = data?.commentId ? data.commentId : data?.commentId;
    this.fleenVideo = data?.fleenVideo ? new FleenVideoView(data?.fleenVideo) : data?.fleenVideo;
    this.member = data?.member ? new MemberView(data.member) : data?.member;
    this.content = data?.content;
  }
}
