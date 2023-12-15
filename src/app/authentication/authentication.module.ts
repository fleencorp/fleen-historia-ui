import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AuthenticationRoutingModule} from './authentication-routing.module';
import {AuthenticationService} from "./service/authentication.service";
import {ForgotPasswordComponent} from "./component/component/forgot-password/forgot-password.component";
import {MfaOtpBaseComponent} from "./component/component/mfa-otp-base/mfa-otp-base.component";
import {MfaVerificationComponent} from "./component/component/mfa-verification/mfa-verification.component";
import {OtpVerificationComponent} from "./component/component/otp-verification/otp-verification.component";
import {ResetPasswordComponent} from "./component/component/reset-password/reset-password.component";
import {SignInComponent} from "./component/component/sign-in/sign-in.component";
import {SignUpComponent} from "./component/component/sign-up/sign-up.component";
import {AuthenticationBaseComponent} from "./component/component/authentication-base/authentication-base.component";


@NgModule({
  declarations: [
    AuthenticationBaseComponent,
    ForgotPasswordComponent,
    MfaOtpBaseComponent,
    MfaVerificationComponent,
    OtpVerificationComponent,
    ResetPasswordComponent,
    SignInComponent,
    SignUpComponent
  ],
  imports: [
    CommonModule,
    AuthenticationRoutingModule
  ],
  providers: [
    AuthenticationService
  ]
})
export class AuthenticationModule { }
