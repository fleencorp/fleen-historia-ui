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
  AdminUpdateVideoObjectComponent
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
    AdminUpdateVideoComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AdminVideoRoutingModule
  ]
})
export class AdminVideoModule { }
