import {ForgotPasswordComponent} from './forgot-password/forgot-password.component';
import {AuthenticationBaseComponent} from "./authentication-base/authentication-base.component";
import {MfaOtpBaseComponent} from "./mfa-otp-base/mfa-otp-base.component";
import {MfaVerificationComponent} from "./mfa-verification/mfa-verification.component";
import {ResetPasswordComponent} from "./reset-password/reset-password.component";
import {SignInComponent} from "./sign-in/sign-in.component";
import {SignUpComponent} from "./sign-up/sign-up.component";

export const AuthenticationModuleComponents = [
  AuthenticationBaseComponent,
  ForgotPasswordComponent,
  MfaOtpBaseComponent,
  MfaVerificationComponent,
  ResetPasswordComponent,
  SignInComponent,
  SignUpComponent,
]
