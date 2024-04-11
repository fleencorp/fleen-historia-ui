import {FleenBaseView} from "@app/model/view";

export class ChannelView extends FleenBaseView {

  public readonly channelId: number;
  public readonly title: string;
  public readonly description: string;

  public constructor(data: ChannelView) {
    super(data);
    this.channelId = data?.channelId;
    this.title = data?.title;
    this.description = data?.description;
  }
}
