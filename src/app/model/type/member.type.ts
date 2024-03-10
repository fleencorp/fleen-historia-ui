import {VerificationType} from "@app/model/enum";
import {ResendVerificationCodePayload, VerificationCodePayload} from "@app/model/type/authentication.type";

export type UpdateDetailPayload = {
  firstName: string;
  lastName: string;
}

export type SendUpdateEmailAddressOrPhoneNumberCodePayload = {
  verificationType: VerificationType;
}

export type ConfirmUpdateEmailAddressPayload = VerificationCodePayload & {
  emailAddress: string;
}

export type ConfirmUpdatePhoneNumberPayload = VerificationCodePayload & {
  phoneNumber: string;
}

export type UpdatePasswordPayload = {
  oldPassword: string;
  password: string;
  newPassword: string;
}

export type UpdateProfilePhotoPayload = {
  profilePhoto: string;
}
