import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AdminYoutubeRoutingModule} from './admin-youtube-routing.module';
import {
  AdminYoutubeAuthenticationComponent,
  AdminYoutubeCategoryEntriesComponent,
  AdminYoutubeChannelEntriesComponent,
  AdminYoutubeChannelVideoEntriesComponent
} from '@app/feature/admin/admin-youtube/component';
import {SharedModule} from "@app/shared/shared.module";
import { AdminYoutubeBaseComponent } from './component/admin-youtube-base/admin-youtube-base.component';
import { AdminYoutubeDashboardComponent } from './component/admin-youtube-dashboard/admin-youtube-dashboard.component';


@NgModule({
  declarations: [
    AdminYoutubeCategoryEntriesComponent,
    AdminYoutubeChannelEntriesComponent,
    AdminYoutubeChannelVideoEntriesComponent,
    AdminYoutubeAuthenticationComponent,
    AdminYoutubeBaseComponent,
    AdminYoutubeDashboardComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AdminYoutubeRoutingModule
  ]
})
export class AdminYoutubeModule { }
