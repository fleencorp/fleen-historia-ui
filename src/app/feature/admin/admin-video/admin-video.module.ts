import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

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
    AdminVideoDashboardComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AdminVideoRoutingModule
  ]
})
export class AdminVideoModule { }
