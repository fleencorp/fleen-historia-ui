import {NgModule} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';

import {UserVideoRoutingModule} from './user-video-routing.module';
import {
  CreateVideoComponent,
  UpdateVideoComponent,
  UpdateVideoInfoComponent,
  UpdateVideoObjectComponent,
  UserVideoBaseComponent,
  UserVideoComponent,
  UserVideoDashboardComponent,
  UserVideosComponent
} from '@app/feature/user-video/component';
import {SharedModule} from "@app/shared/shared.module";
import {UserVideoService} from "@app/feature/user-video/service";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {BaseModule} from "@app/base/base.module";
import {ContributorService} from "@app/feature/contributor/service";


@NgModule({
  declarations: [
    UserVideosComponent,
    UserVideoComponent,
    CreateVideoComponent,
    UpdateVideoComponent,
    UpdateVideoInfoComponent,
    UpdateVideoObjectComponent,
    UserVideoBaseComponent,
    UserVideoDashboardComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    UserVideoRoutingModule,
    FontAwesomeModule,
    BaseModule,
    NgOptimizedImage
  ],
  exports: [
    UpdateVideoInfoComponent,
    UpdateVideoObjectComponent
  ],
  providers: [
    UserVideoService,
    ContributorService
  ]
})
export class UserVideoModule { }
