import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FleenComgroupComponent} from "./component";
import {AuthTokenService, LocalStorageService, LoggerService, SessionStorageService} from "./service";
import {AuthGuardService} from "./guard";
import {ValidIfTruthyPipe} from "./pipe";


@NgModule({
  declarations: [
    FleenComgroupComponent,
    ValidIfTruthyPipe
  ],
  providers: [
    AuthGuardService,
    AuthTokenService,
    LocalStorageService,
    LoggerService,
    SessionStorageService
  ],
  exports: [
    ValidIfTruthyPipe
  ],
  imports: [
    CommonModule
  ]
})
export class BaseModule { }
