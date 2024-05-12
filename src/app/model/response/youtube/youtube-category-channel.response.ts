import {VideoCategory} from "@app/model/youtube/video-category";
import {Channel} from "@app/model/youtube/channel";

export class YouTubeChannelCategoryResponse {
  public isAlreadyExistInSystem: boolean;
  public description: string;

  public constructor(data: YouTubeChannelCategoryResponse) {
    this.isAlreadyExistInSystem = data?.isAlreadyExistInSystem;
    this.description = data?.description;
  }
}

export class YouTubeCategoryResponse extends YouTubeChannelCategoryResponse {

  public categoryDetails: VideoCategory;

  public constructor(data: YouTubeCategoryResponse) {
    super(data);
    this.categoryDetails = new VideoCategory(data?.categoryDetails);
  }
}


export class YouTubeChannelResponse extends YouTubeChannelCategoryResponse {

  public readonly channelDetails: Channel;

  public constructor(data: YouTubeChannelResponse) {
    super(data);
    this.channelDetails = new Channel(data?.channelDetails);
  }
}
