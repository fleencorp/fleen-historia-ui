import {SearchResult} from "@app/model/youtube/video";

export class YoutubeVideoResponse {

  public readonly videoId: string;
  public readonly title: string;
  public readonly description: string;
  public readonly videoUrl: string;
  public readonly searchResult: SearchResult;

  public constructor(data: YoutubeVideoResponse) {
    this.videoId = data?.videoId;
    this.title = data?.title;
    this.description = data?.description;
    this.videoUrl = data?.videoUrl;
    this.searchResult = new SearchResult(data?.searchResult);
  }
}

