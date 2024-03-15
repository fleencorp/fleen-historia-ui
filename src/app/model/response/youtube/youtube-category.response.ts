import {VideoCategory} from "@app/model/youtube/video-category";

export class YouTubeCategoryResponse {

  public isAlreadyExistInSystem: boolean;
  public videoCategory: VideoCategory;

  public constructor(data: YouTubeCategoryResponse) {
    this.isAlreadyExistInSystem = data?.isAlreadyExistInSystem;
    this.videoCategory = data?.videoCategory;
  }
}
