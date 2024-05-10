import {FleenBaseView} from "@app/model/view";

export class MemberStatusView extends FleenBaseView {
  public readonly title: string;
  public readonly code: string;
  public readonly description: string;

  public constructor(data: MemberStatusView) {
    super(data);
    this.title = data?.title ?? '';
    this.code = data?.code ?? '';
    this.description = data?.description ?? '';
  }
}
