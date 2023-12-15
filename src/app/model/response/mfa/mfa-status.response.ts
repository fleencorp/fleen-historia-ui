import {MfaType} from "@app/model/enum";

export class MfaStatusResponse {

  public enabled: boolean;
  public mfaType: MfaType;

  public constructor(data: MfaStatusResponse) {
    this.enabled = data?.enabled;
    this.mfaType = data?.mfaType;
  }
}
