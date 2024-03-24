import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

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
    UserVideoRoutingModule
  ],
  exports: [
    UpdateVideoInfoComponent,
    UpdateVideoObjectComponent
  ],
  providers: [
    UserVideoService
  ]
})
export class UserVideoModule { }
