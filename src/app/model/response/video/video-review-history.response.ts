import {FleenVideoView, VideoReviewView} from "@app/model/view/video";

export class VideoReviewHistoryResponse {

  public fleenVideo: FleenVideoView;
  public reviews: VideoReviewView[];

  public constructor(data: VideoReviewHistoryResponse) {
    this.fleenVideo = data?.fleenVideo;
    this.reviews = data?.reviews ? data.reviews : [];
  }
}
