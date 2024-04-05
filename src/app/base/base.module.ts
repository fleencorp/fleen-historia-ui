import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FleenComgroupComponent, NavBarComponent} from "./component";
import {AuthTokenService, LocalStorageService, LoggerService, SessionStorageService} from "./service";
import {AuthGuardService} from "./guard";
import {ValidIfTruthyPipe} from "./pipe";
import {UnlessDirective} from '@app/base/directive';
import {SafeUrlPipe} from '@app/base/pipe';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {RouterLink, RouterLinkActive} from "@angular/router";
import { DashboardComponent } from './component/dashboard/dashboard.component';


@NgModule({
  declarations: [
    FleenComgroupComponent,
    ValidIfTruthyPipe,
    UnlessDirective,
    SafeUrlPipe,
    NavBarComponent,
    DashboardComponent
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
    CommonModule,
    FontAwesomeModule,
    RouterLink,
    RouterLinkActive
  ]
})
export class BaseModule { }
