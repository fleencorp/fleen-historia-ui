import {NgModule} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';

import {AdminVideoRoutingModule} from './admin-video-routing.module';
import {
  AdminCreateVideoComponent,
  AdminDeleteAllVideosComponent,
  AdminFindVideoComponent,
  AdminFindVideosComponent,
  AdminUpdateVideoComponent,
  AdminUpdateVideoInfoComponent,
  AdminUpdateVideoObjectComponent,
  AdminVideoBaseComponent,
  AdminVideoDashboardComponent
} from '@app/feature/admin/admin-video/component';
import {SharedModule} from "@app/shared/shared.module";
import {UserVideoModule} from "@app/feature/user-video/user-video.module";
import { VideoItemRowComponent } from './component/video-item-row/video-item-row.component';
import {BaseModule} from "@app/base/base.module";


@NgModule({
  declarations: [
    AdminFindVideosComponent,
    AdminFindVideoComponent,
    AdminCreateVideoComponent,
    AdminUpdateVideoInfoComponent,
    AdminUpdateVideoObjectComponent,
    AdminDeleteAllVideosComponent,
    AdminUpdateVideoComponent,
    AdminVideoBaseComponent,
    AdminVideoDashboardComponent,
    VideoItemRowComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AdminVideoRoutingModule,
    UserVideoModule,
    BaseModule,
    NgOptimizedImage
  ]
})
export class AdminVideoModule { }
