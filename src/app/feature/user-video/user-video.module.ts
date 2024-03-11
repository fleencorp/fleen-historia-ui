import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserVideoRoutingModule } from './user-video-routing.module';
import { UserVideosComponent } from './component/user-videos/user-videos.component';
import { UserVideoComponent } from './component/user-video/user-video.component';
import { CreateVideoComponent } from './component/create-video/create-video.component';
import { UpdateVideoComponent } from './component/update-video/update-video.component';
import { UpdateVideoInfoComponent } from './component/update-video-info/update-video-info.component';
import { UpdateVideoObjectComponent } from './component/update-video-object/update-video-object.component';
import { RequestReviewComponent } from './component/request-review/request-review.component';
import {SharedComponentModule} from "@app/shared/component/shared-component.module";
import { UserVideoBaseComponent } from './component/user-video-base/user-video-base.component';
import { UserVideoDashboardComponent } from './component/user-video-dashboard/user-video-dashboard.component';


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
    SharedComponentModule,
    UserVideoRoutingModule
  ]
})
export class UserVideoModule { }
