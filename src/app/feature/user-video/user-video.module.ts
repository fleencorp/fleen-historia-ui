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


@NgModule({
  declarations: [
    UserVideosComponent,
    UserVideoComponent,
    CreateVideoComponent,
    UpdateVideoComponent,
    UpdateVideoInfoComponent,
    UpdateVideoObjectComponent,
    RequestReviewComponent
  ],
  imports: [
    CommonModule,
    UserVideoRoutingModule
  ]
})
export class UserVideoModule { }
