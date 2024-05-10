export class Channel {
  public readonly etag: string;
  public readonly id: string;
  public readonly kind: string;
  public readonly snippet: ChannelSnippet;

  public constructor(data: Channel) {
    this.etag = data?.etag ?? '';
    this.id = data?.id ?? '';
    this.kind = data?.kind ?? '';
    this.snippet = new ChannelSnippet(data?.snippet);
  }
}

export class ChannelSnippet {
  public readonly country: string;
  public readonly customUrl: string;
  public readonly defaultLanguage: string;
  public readonly description: string;
  public readonly publishedAt: Date;
  public readonly title: string;
  public readonly localized: ChannelLocalization;
  public readonly thumbnails: ThumbnailDetails;
  public readonly statistics: ChannelStatistics;
  public readonly status: ChannelStatus;

  public constructor(data: ChannelSnippet) {
    this.country = data?.country ?? '';
    this.customUrl = data?.customUrl ?? '';
    this.defaultLanguage = data?.defaultLanguage ?? '';
    this.description = data?.description ?? '';
    this.publishedAt = data?.publishedAt ? new Date(data.publishedAt) : new Date();
    this.title = data?.title ?? '';
    this.localized = new ChannelLocalization(data?.localized);
    this.thumbnails = new ThumbnailDetails(data?.thumbnails);
    this.statistics = new ChannelStatistics(data?.statistics);
    this.status = new ChannelStatus(data?.status);
  }
}

export class ThumbnailDetails {
  public readonly default: Thumbnail;
  public readonly high: Thumbnail;
  public readonly maxres: Thumbnail;
  public readonly medium: Thumbnail;
  public readonly standard: Thumbnail;

  public constructor(data: ThumbnailDetails) {
    this.default = new Thumbnail(data?.default);
    this.high = new Thumbnail(data?.high);
    this.maxres = new Thumbnail(data?.maxres);
    this.medium = new Thumbnail(data?.medium);
    this.standard = new Thumbnail(data?.standard);
  }
}

export class Thumbnail {
  public readonly height: number;
  public readonly url: string;
  public readonly width: number;

  public constructor(data: Thumbnail) {
    this.height = data?.height ?? 0;
    this.url = data?.url ?? '';
    this.width = data?.width ?? 0;
  }
}

export class ChannelLocalization {
  public readonly description: string;
  public readonly title: string;

  public constructor(data: ChannelLocalization) {
    this.description = data?.description ?? '';
    this.title = data?.title ?? '';
  }
}

export class ChannelStatistics {
  public readonly commentCount: number;
  public readonly hiddenSubscriberCount: number;
  public readonly subscriberCount: number;
  public readonly videoCount: number;
  public readonly viewCount: number;

  public constructor(data: ChannelStatistics) {
    this.commentCount = data?.commentCount ?? 0;
    this.hiddenSubscriberCount = data?.hiddenSubscriberCount ?? 0;
    this.subscriberCount = data?.subscriberCount ?? 0;
    this.videoCount = data?.videoCount ?? 0;
    this.viewCount = data?.viewCount ?? 0;
  }
}

export class ChannelStatus {
  public readonly isLinked: boolean;
  public readonly longUploadsStatus: string;
  public readonly madeForKids: boolean;
  public readonly privacyStatus: string;
  public readonly selfDeclaredMadeForKids: boolean;

  public constructor(data: ChannelStatus) {
    this.isLinked = data?.isLinked ?? false;
    this.longUploadsStatus = data?.longUploadsStatus ?? '';
    this.madeForKids = data?.madeForKids ?? false;
    this.privacyStatus = data?.privacyStatus ?? '';
    this.selfDeclaredMadeForKids = data?.selfDeclaredMadeForKids ?? false;
  }
}
