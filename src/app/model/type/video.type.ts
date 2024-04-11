import {VideoReviewStatus, VideoVisibility} from "@app/model/enum";

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

export type SubmitVideoReviewPayload = {
  videoReviewStatus: VideoReviewStatus;
  comment: string;
}

export type UpdateVideoVisibilityPayload = {
  visibility: VideoVisibility;
}


export type SubmitCommentPayload = {
  content: string;
}

export type SubmitReplyPayload = SubmitCommentPayload;
