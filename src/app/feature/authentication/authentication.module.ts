import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {
  AuthenticationBaseComponent,
  ForgotPasswordComponent,
  MfaOtpBaseComponent,
  MfaVerificationComponent,
  ResetPasswordComponent,
  SignInComponent,
  SignUpComponent
} from './component';
import {AuthenticationRoutingModule} from "./authentication-routing.module";
import {AuthenticationService} from "./service/authentication.service";
import {SharedModule} from "@app/shared/shared.module";

@NgModule({
  declarations: [
    AuthenticationBaseComponent,
    ForgotPasswordComponent,
    MfaOtpBaseComponent,
    MfaVerificationComponent,
    ResetPasswordComponent,
    SignInComponent,
    SignUpComponent,
  ],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    SharedModule
  ],
  providers: [
    AuthenticationService
  ]
})
export class AuthenticationModule { }
