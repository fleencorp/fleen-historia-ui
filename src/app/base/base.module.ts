import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FleenComgroupComponent} from "./component";
import {AuthTokenService, LocalStorageService, LoggerService, SessionStorageService} from "@app/base/service";
import {AuthGuardService} from "@app/base/guard";


@NgModule({
  declarations: [
    FleenComgroupComponent,
  ],
  providers: [
    AuthGuardService,
    AuthTokenService,
    LocalStorageService,
    LoggerService,
    SessionStorageService
  ],
  imports: [
    CommonModule
  ]
})
export class BaseModule { }
