import {FleenBaseView} from "@app/model/view";

export class ChannelView extends FleenBaseView {
  public readonly channelId: number;
  public readonly title: string;
  public readonly description: string;
  public readonly isActive: boolean;

  public constructor(data: ChannelView) {
    super(data);
    this.channelId = data?.channelId ?? 0;
    this.title = data?.title ?? '';
    this.description = data?.description ?? '';
    this.isActive = data?.isActive ?? false;
  }
}
