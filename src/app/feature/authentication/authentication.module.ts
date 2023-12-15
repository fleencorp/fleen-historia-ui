import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AuthenticationRoutingModule} from './authentication-routing.module';
import {AuthenticationService} from "./service/authentication.service";
import {AuthenticationModuleComponents} from "@app/feature/authentication/component";


@NgModule({
  declarations: [
    ...AuthenticationModuleComponents
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
