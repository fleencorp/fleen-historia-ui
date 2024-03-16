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


@NgModule({
  declarations: [
    AdminYoutubeCategoryEntriesComponent,
    AdminYoutubeChannelEntriesComponent,
    AdminYoutubeChannelVideoEntriesComponent,
    AdminYoutubeAuthenticationComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AdminYoutubeRoutingModule
  ]
})
export class AdminYoutubeModule { }
