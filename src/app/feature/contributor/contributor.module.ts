import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContributorRoutingModule } from './contributor-routing.module';
import { PendingVideosComponent } from './component/pending-videos/pending-videos.component';
import { PendingVideoComponent } from './component/pending-video/pending-video.component';
import { SubmitVideoReviewComponent } from './component/submit-video-review/submit-video-review.component';
import { ReviewHistoryComponent } from './component/review-history/review-history.component';
import { MyReviewHistoryComponent } from './component/my-review-history/my-review-history.component';
import {ReactiveFormsModule} from "@angular/forms";
import {SharedComponentModule} from "@app/shared/component/shared-component.module";
import {SharedModule} from "@app/shared/shared.module";


@NgModule({
  declarations: [
    PendingVideosComponent,
    PendingVideoComponent,
    SubmitVideoReviewComponent,
    ReviewHistoryComponent,
    MyReviewHistoryComponent
  ],
  imports: [
    CommonModule,
    ContributorRoutingModule,
    ReactiveFormsModule,
    SharedComponentModule,
    SharedModule
  ]
})
export class ContributorModule { }
