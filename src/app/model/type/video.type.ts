import {VideoVisibility} from "@app/model/enum";

export type CreateVideoPayload = {
  title: string;
  description: string;
  tags: string;
  referenceOrSource: string;
  visibility: VideoVisibility;
  channelId: string;
  categoryId: string;
  isForKids: boolean;
}

export type UpdateVideoPayload = CreateVideoPayload;

export type UpdateVideoObjectPayload = {
  objectOrVideoUrl: string;
  objectOrThumbnailUrl: string;
}
