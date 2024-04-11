import {VideoReviewStatus} from "@app/model/enum";
import {FleenBaseView} from "@app/model/view";
import {FleenVideoView} from "@app/model/view/video";
import {MemberView} from "@app/model/view/member";

export class VideoReviewView extends FleenBaseView {

  public readonly videoReviewId: number;
  public readonly fleenVideo: FleenVideoView;
  public readonly member: MemberView;
  public readonly videoReviewStatus: VideoReviewStatus;
  public readonly comment: string;

  public constructor(data: VideoReviewView) {
    super(data);
    this.videoReviewId = data?.videoReviewId;
    this.fleenVideo = data?.fleenVideo ? new FleenVideoView(data?.fleenVideo) : data?.fleenVideo;
    this.member = data?.member ? new MemberView(data?.member) : data?.member;
    this.videoReviewStatus = data?.videoReviewStatus;
    this.comment = data?.comment;
  }
}
