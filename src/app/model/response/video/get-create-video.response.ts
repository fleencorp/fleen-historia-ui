import {ChannelView} from "@app/model/view/channel";
import {CategoryView} from "@app/model/view/category";

export class GetCreateVideoResponse {

  public readonly channels: ChannelView[];
  public readonly categories: CategoryView[];

  public constructor(data: GetCreateVideoResponse) {
    this.channels = data?.channels ? data.channels : [];
    this.categories = data?.categories ? data.categories : [];
  }
}
