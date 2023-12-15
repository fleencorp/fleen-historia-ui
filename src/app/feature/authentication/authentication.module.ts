import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {
  AuthenticationBaseComponent,
  ForgotPasswordComponent,
  MfaOtpBaseComponent,
  MfaVerificationComponent,
  OtpVerificationComponent,
  ResetPasswordComponent,
  SignInComponent,
  SignUpComponent
} from './component';
import {AuthenticationRoutingModule} from "./authentication-routing.module";
import {AuthenticationService} from "./service/authentication.service";
import {SharedModule} from "@app/shared/shared.module";
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AuthenticationBaseComponent,
    ForgotPasswordComponent,
    MfaOtpBaseComponent,
    MfaVerificationComponent,
    OtpVerificationComponent,
    ResetPasswordComponent,
    SignInComponent,
    SignUpComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    AuthenticationRoutingModule,
  ],
  providers: [
    AuthenticationService
  ]
})
export class AuthenticationModule { }
