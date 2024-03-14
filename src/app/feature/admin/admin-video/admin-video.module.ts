import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminVideoRoutingModule } from './admin-video-routing.module';
import { AdminFindVideosComponent } from './component/admin-find-videos/admin-find-videos.component';
import { AdminFindVideoComponent } from './component/admin-find-video/admin-find-video.component';
import { AdminCreateVideoComponent } from './component/admin-create-video/admin-create-video.component';
import { AdminUpdateVideoInfoComponent } from './component/admin-update-video-info/admin-update-video-info.component';
import { AdminUpdateVideoObjectComponent } from './component/admin-update-video-object/admin-update-video-object.component';
import { AdminDeleteAllVideosComponent } from './component/admin-delete-all-videos/admin-delete-all-videos.component';
import {SharedComponentModule} from "@app/shared/component/shared-component.module";
import { AdminUpdateVideoComponent } from './component/admin-update-video/admin-update-video.component';


@NgModule({
  declarations: [
    AdminFindVideosComponent,
    AdminFindVideoComponent,
    AdminCreateVideoComponent,
    AdminUpdateVideoInfoComponent,
    AdminUpdateVideoObjectComponent,
    AdminDeleteAllVideosComponent,
    AdminUpdateVideoComponent
  ],
  imports: [
    CommonModule,
    AdminVideoRoutingModule,
    SharedComponentModule
  ]
})
export class AdminVideoModule { }
