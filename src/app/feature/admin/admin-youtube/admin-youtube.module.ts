import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminYoutubeRoutingModule } from './admin-youtube-routing.module';
import { AdminYoutubeCategoryEntriesComponent } from '@app/feature/admin/admin-youtube/component/admin-youtube-category-entries/admin-youtube-category-entries.component';


@NgModule({
  declarations: [
    AdminYoutubeCategoryEntriesComponent
  ],
  imports: [
    CommonModule,
    AdminYoutubeRoutingModule
  ]
})
export class AdminYoutubeModule { }
