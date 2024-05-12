import {FleenBaseView} from "@app/model/view";

export class RoleView extends FleenBaseView {
  public readonly roleId: number;
  public readonly title: string;
  public readonly code: string;

  public constructor(data: RoleView) {
    super(data);
    this.roleId = data?.roleId ?? 0;
    this.title = data?.title ?? '';
    this.code = data?.code ?? '';
  }
}
