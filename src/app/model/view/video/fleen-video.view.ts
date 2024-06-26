import {FleenBaseView} from "@app/model/view";
import {VideoSource, VideoStatus, VideoVisibility} from "@app/model/enum";
import {CategoryView} from "@app/model/view/category";
import {ChannelView} from "@app/model/view/channel";
import {VideoReviewView} from "@app/model/view/video";

export class FleenVideoView extends FleenBaseView {
  public readonly fleenVideoId: number;
  public readonly videoTitle: string;
  public readonly videoDescription: string;
  public readonly videoUrl: string;
  public readonly videoTags: string;
  public readonly videoReferenceOrSource: string;
  public readonly objectUrl: string;
  public readonly objectThumbnail: string;
  public readonly videoSource: VideoSource;
  public readonly videoVisibility: VideoVisibility;
  public videoStatus: VideoStatus;
  public readonly isPublished: boolean;
  public readonly isForKids: boolean;
  public readonly isObjectApproved: boolean;
  public readonly category: CategoryView;
  public readonly channel: ChannelView;
  public readonly latestReview: VideoReviewView;
  public errorMessage: string;
  public statusMessage: string;
  public isSubmittingForReview: boolean;
  public isSubmittingForReviewSuccessful: boolean;
  public isPublishing: boolean;
  public isPublishingSuccessful: boolean;

  public constructor(data: FleenVideoView) {
    super(data);
    this.fleenVideoId = data.fleenVideoId ?? 0;
    this.videoTitle = data?.videoTitle ?? '';
    this.videoDescription = data?.videoDescription ?? '';
    this.videoUrl = data?.videoUrl ?? '';
    this.videoTags = data?.videoTags ?? '';
    this.videoReferenceOrSource = data?.videoReferenceOrSource ?? '';
    this.objectUrl = data?.objectUrl ?? '';
    this.objectThumbnail = data?.objectThumbnail ?? '';
    this.videoSource = data?.videoSource;
    this.videoVisibility = data?.videoVisibility;
    this.videoStatus = data?.videoStatus;
    this.isPublished = data?.isPublished ?? false;
    this.isForKids = data?.isForKids ?? false;
    this.category = new CategoryView(data?.category);
    this.channel = new ChannelView(data?.channel);
    this.latestReview = new VideoReviewView(data?.latestReview);
    this.isObjectApproved = data?.isObjectApproved ?? false;
    this.errorMessage = '';
    this.statusMessage = '';
    this.isSubmittingForReview = false;
    this.isSubmittingForReviewSuccessful = false;
    this.isPublishing = false;
    this.isPublishingSuccessful = false;
  }
}

export class FleenVideoShortView {
  public readonly fleenVideoId: number;
  public readonly videoTitle: string;
  public readonly videoDescription: string;
  public readonly videoStatus: VideoStatus;

  public constructor(data: FleenVideoView) {
    this.fleenVideoId = data?.fleenVideoId ?? 0;
    this.videoTitle = data?.videoTitle ?? '';
    this.videoDescription = data?.videoDescription ?? '';
    this.videoStatus = data?.videoStatus;
  }
}
