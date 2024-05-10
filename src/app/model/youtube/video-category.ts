export class VideoCategory {
  public readonly etag: string;
  public readonly id: string;
  public readonly kind: string;
  public readonly snippet: VideoCategorySnippet;

  public constructor(data: VideoCategory) {
    this.etag = data?.etag ?? '';
    this.id = data?.id ?? '';
    this.kind = data?.kind ?? '';
    this.snippet = new VideoCategorySnippet(data?.snippet);
  }
}

export class VideoCategorySnippet {
  public readonly assignable: boolean;
  public readonly channelId: string;
  public readonly title: string;

  public constructor(data: VideoCategorySnippet) {
    this.assignable = data?.assignable ?? false;
    this.channelId = data?.channelId ?? '';
    this.title = data?.title ?? '';
  }
}
