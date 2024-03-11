import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {UserVideoRoutingModule} from './user-video-routing.module';
import {
  CreateVideoComponent,
  RequestReviewComponent,
  UpdateVideoComponent,
  UpdateVideoInfoComponent,
  UpdateVideoObjectComponent,
  UserVideoBaseComponent,
  UserVideoComponent,
  UserVideoDashboardComponent,
  UserVideosComponent
} from '@app/feature/user-video/component';
import {SharedModule} from "@app/shared/shared.module";


@NgModule({
  declarations: [
    UserVideosComponent,
    UserVideoComponent,
    CreateVideoComponent,
    UpdateVideoComponent,
    UpdateVideoInfoComponent,
    UpdateVideoObjectComponent,
    RequestReviewComponent,
    UserVideoBaseComponent,
    UserVideoDashboardComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    UserVideoRoutingModule
  ]
})
export class UserVideoModule { }
