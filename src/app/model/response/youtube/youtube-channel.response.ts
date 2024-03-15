import {Channel} from "@app/model/youtube/channel";

export class YouTubeChannelResponse {

  public readonly isAlreadyExistInSystem: boolean;
  public readonly channel: Channel;

  public constructor(data: YouTubeChannelResponse) {
    this.isAlreadyExistInSystem = data?.isAlreadyExistInSystem;
    this.channel = new Channel(data?.channel);
  }
}
