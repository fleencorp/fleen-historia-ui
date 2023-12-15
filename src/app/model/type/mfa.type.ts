import {MfaType} from "@app/model/enum";

export type MfaTypePayload = {
  mfaType: MfaType;
}

export type ConfirmMfaPayload = MfaTypePayload & {
  code: string;
}
