import {CommentView} from "@app/model/view/discussion/comment.view";
import {FleenVideoView} from "@app/model/view/video";
import {MemberView} from "@app/model/view/member";
import {FleenResponse} from "@app/model/response";

export class ReplyView extends FleenResponse {

  public readonly replyId: number;
  public readonly comment: CommentView;
  public readonly fleenVideo: FleenVideoView;
  public readonly member: MemberView;
  public readonly content: string;

  public constructor(data: ReplyView) {
    super(data);
    this.replyId = data?.replyId;
    this.comment = data?.comment ? new CommentView(data.comment) : data?.comment;
    this.fleenVideo = data?.fleenVideo ? new FleenVideoView(data.fleenVideo) : data?.fleenVideo;
    this.member = data?.member ? new MemberView(data.member) : data?.member;
    this.content = data?.content;
  }
}
