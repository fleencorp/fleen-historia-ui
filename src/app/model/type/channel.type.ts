export type CreateChannelPayload = {
  title: string;
  description?: string;
  channelExternalId: string;
}

export type UpdateChannelPayload = {
  title: string;
  description?: string;
  isActive: boolean;
}
