import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FleenComgroupComponent, NavBarComponent} from "./component";
import {AuthTokenService, LocalStorageService, LoggerService, SessionStorageService} from "./service";
import {AuthGuardService} from "./guard";
import {ValidIfTruthyPipe} from "./pipe";
import {UnlessDirective} from '@app/base/directive';
import {SafeUrlPipe} from '@app/base/pipe';


@NgModule({
  declarations: [
    FleenComgroupComponent,
    ValidIfTruthyPipe,
    UnlessDirective,
    SafeUrlPipe,
    NavBarComponent
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
    SafeUrlPipe,
    UnlessDirective,
    NavBarComponent
  ],
  imports: [
    CommonModule
  ]
})
export class BaseModule { }
