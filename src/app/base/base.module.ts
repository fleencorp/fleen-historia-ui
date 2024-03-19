import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FleenComgroupComponent} from "./component";
import {AuthTokenService, LocalStorageService, LoggerService, SessionStorageService} from "./service";
import {AuthGuardService} from "./guard";
import {ValidIfTruthyPipe} from "./pipe";
import {UnlessDirective} from '@app/base/directive';


@NgModule({
  declarations: [
    FleenComgroupComponent,
    ValidIfTruthyPipe,
    UnlessDirective
  ],
  providers: [
    AuthGuardService,
    AuthTokenService,
    LocalStorageService,
    LoggerService,
    SessionStorageService
  ],
  exports: [
    ValidIfTruthyPipe,
    UnlessDirective
  ],
  imports: [
    CommonModule
  ]
})
export class BaseModule { }
