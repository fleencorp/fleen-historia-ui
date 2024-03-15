import {ThumbnailDetails} from "@app/model/youtube/channel";

export class SearchResult {

  public readonly etag: string;
  public readonly id: string;
  public readonly kind: string;
  public readonly snippet: SearchResultSnippet;

  public constructor(data: SearchResult) {
    this.etag = data?.etag;
    this.id = data?.id;
    this.kind = data?.kind;
    this.snippet = new SearchResultSnippet(data?.snippet);
  }

}

class SearchResultSnippet {

  public readonly channelId: string;
  public readonly channelTitle: string;
  public readonly description: string;
  public readonly publishedAt: Date;
  public readonly title: string;
  public readonly thumbnails: ThumbnailDetails;

  public constructor(data: SearchResultSnippet) {
    this.channelId = data?.channelId;
    this.channelTitle = data?.channelTitle;
    this.description = data?.description;
    this.publishedAt = data?.publishedAt ? new Date(data?.publishedAt) : new Date();
    this.title = data?.title;
    this.thumbnails = new ThumbnailDetails(data?.thumbnails);
  }
}
