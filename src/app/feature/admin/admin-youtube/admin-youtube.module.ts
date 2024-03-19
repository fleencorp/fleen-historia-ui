import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AdminYoutubeRoutingModule} from './admin-youtube-routing.module';
import {
  AdminYoutubeAuthenticationComponent,
  AdminYoutubeBaseComponent,
  AdminYoutubeCategoryEntriesComponent,
  AdminYoutubeChannelEntriesComponent,
  AdminYoutubeChannelVideoEntriesComponent,
  AdminYoutubeDashboardComponent,
  AdminYoutubeStartAuthenticationComponent,
  AdminYoutubeVerifyAuthorizationCodeComponent
} from '@app/feature/admin/admin-youtube/component';
import {SharedModule} from "@app/shared/shared.module";
import {AdminYoutubeService} from "@app/feature/admin/admin-youtube/service";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {AdminCategoryModule} from "@app/feature/admin/admin-category/admin-category.module";
import {AdminChannelModule} from "@app/feature/admin/admin-channel/admin-channel.module";


@NgModule({
  declarations: [
    AdminYoutubeCategoryEntriesComponent,
    AdminYoutubeChannelEntriesComponent,
    AdminYoutubeChannelVideoEntriesComponent,
    AdminYoutubeAuthenticationComponent,
    AdminYoutubeBaseComponent,
    AdminYoutubeDashboardComponent,
    AdminYoutubeStartAuthenticationComponent,
    AdminYoutubeVerifyAuthorizationCodeComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FontAwesomeModule,
    AdminYoutubeRoutingModule,
    AdminCategoryModule,
    AdminChannelModule
  ],
  providers: [
    AdminYoutubeService
  ]
})
export class AdminYoutubeModule { }
