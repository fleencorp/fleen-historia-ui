import {FleenVideoView} from "@app/model/view/video";
import {MemberView} from "@app/model/view/member";
import {ReplyView} from "@app/model/view/discussion";
import {toValues} from "@app/shared/helper";
import {FleenBaseView} from "@app/model/view";

export class CommentView extends FleenBaseView {
  public readonly commentId: number;
  public readonly fleenVideo: FleenVideoView;
  public readonly member: MemberView;
  public readonly content: string;
  public replies: ReplyView[];

  public constructor(data: CommentView) {
    super(data);
    this.commentId = data?.commentId ?? 0;
    this.fleenVideo = data?.fleenVideo ? new FleenVideoView(data.fleenVideo) : data?.fleenVideo;
    this.member = data?.member ? new MemberView(data.member) : data?.member;
    this.content = data?.content ?? '';
    this.replies = data?.replies ? toValues(data.replies, ReplyView) : [];
  }
}
