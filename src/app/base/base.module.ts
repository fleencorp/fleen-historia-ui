import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FleenComgroupComponent, NavBarComponent} from "./component";
import {AuthTokenService, LocalStorageService, LoggerService, NetworkService, SessionStorageService} from "./service";
import {AuthGuardService} from "./guard";
import {ValidIfTruthyPipe} from "./pipe";
import {UnlessDirective} from '@app/base/directive';
import {DefaultImagePipe, SafeUrlPipe} from '@app/base/pipe';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {DashboardComponent} from '@app/base/component';


@NgModule({
  declarations: [
    FleenComgroupComponent,
    ValidIfTruthyPipe,
    UnlessDirective,
    SafeUrlPipe,
    NavBarComponent,
    DashboardComponent,
    DefaultImagePipe,
  ],
  providers: [
    AuthGuardService,
    AuthTokenService,
    LocalStorageService,
    LoggerService,
    SessionStorageService,
    NetworkService
  ],
  exports: [
    ValidIfTruthyPipe,
    SafeUrlPipe,
    UnlessDirective,
    NavBarComponent,
    DefaultImagePipe
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    RouterLink,
    RouterLinkActive,
  ]
})
export class BaseModule { }
