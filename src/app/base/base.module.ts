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
import { GameOPipe } from './game-o.pipe';
import { HomepageVideosComponent } from './component/video/homepage-videos/homepage-videos.component';
import {SharedComponentModule} from "@app/shared/component/shared-component.module";


@NgModule({
  declarations: [
    FleenComgroupComponent,
    ValidIfTruthyPipe,
    UnlessDirective,
    SafeUrlPipe,
    NavBarComponent,
    DashboardComponent,
    DefaultImagePipe,
    GameOPipe,
    HomepageVideosComponent,
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
    SharedComponentModule
  ]
})
export class BaseModule { }
