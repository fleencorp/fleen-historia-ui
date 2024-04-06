import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {
  AuthenticationBaseComponent,
  ForgotPasswordComponent,
  MfaOtpBaseComponent,
  MfaVerificationComponent,
  OtpVerificationComponent,
  SignInComponent,
  SignUpComponent
} from './component';
import {AuthenticationRoutingModule} from "./authentication-routing.module";
import {AuthenticationService} from "./service/authentication.service";
import {SharedModule} from "@app/shared/shared.module";
import {ReactiveFormsModule} from "@angular/forms";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";

@NgModule({
  declarations: [
    AuthenticationBaseComponent,
    ForgotPasswordComponent,
    MfaOtpBaseComponent,
    MfaVerificationComponent,
    OtpVerificationComponent,
    SignInComponent,
    SignUpComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    AuthenticationRoutingModule,
    FontAwesomeModule,
  ],
  providers: [
    AuthenticationService
  ]
})
export class AuthenticationModule { }
