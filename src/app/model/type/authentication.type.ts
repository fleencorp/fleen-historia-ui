import {AuthVerificationType, ChangePasswordType, MfaType, VerificationType} from "../enum";

export type SignInPayload = {
  emailAddress: string;
  password: string;
}

export type SignUpPayload = {
  profileType: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  emailAddress: string;
  phoneNumber: string;
  gender: string;
  password: string;
  confirmPassword: string;
  verificationType: string;
}

export type AuthVerificationPayload = {
  code: string;
  verificationType?: VerificationType;
  mfaType?: MfaType
  type: AuthVerificationType
}

export type ResendVerificationCodePayload = {
  emailAddress?: string;
  phoneNumber?: string;
  verificationType: VerificationType
}

export type ChangePasswordPayload = {
  password: string;
  confirmPassword: string;
  type: ChangePasswordType
}

export type ForgotPasswordPayload = {
  emailAddress: string;
  verificationType: VerificationType
}

export type ResetPasswordPayload = {
  emailAddress: string;
  code: string;
}
