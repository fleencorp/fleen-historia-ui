import {EnumView} from "@app/model/type";

export class AvailableUserRoleResponse {
  public readonly roles: EnumView[];

  public constructor(data: AvailableUserRoleResponse) {
    this.roles = data?.roles ?? [];
  }
}
