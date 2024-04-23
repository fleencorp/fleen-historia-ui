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
import {environment} from "@app/environment";
import {GOOGLE_RECAPTCHA_FIELD_KEY} from "@app/constant";
import {RECAPTCHA_V3_SITE_KEY, RecaptchaModule, RecaptchaV3Module} from "ng-recaptcha";

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
    FontAwesomeModule,
    RecaptchaModule,
    RecaptchaV3Module,
    SharedModule,
    AuthenticationRoutingModule,
  ],
  providers: [
    AuthenticationService,
    {
      provide: RECAPTCHA_V3_SITE_KEY,
      useValue: environment[GOOGLE_RECAPTCHA_FIELD_KEY],
    },
  ]
})
export class AuthenticationModule { }
