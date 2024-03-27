import {FleenVideoView} from "@app/model/view/video";

export class FleenVideoResponse {

  public readonly fleenVideo: FleenVideoView;
  public relatedVideos: FleenVideoView[];

  public constructor(data: FleenVideoResponse) {
    this.fleenVideo = new FleenVideoView(data?.fleenVideo);
    this.relatedVideos = data?.relatedVideos ? data?.relatedVideos : [];
    this.setActualRelatedVideos();
  }

  public setActualRelatedVideos(): void {
    const videos: FleenVideoView[] = [];
    this.relatedVideos.map((video: FleenVideoView): void => {
      videos.push(new FleenVideoView(video));
    });
    this.relatedVideos = videos;
  }
}
