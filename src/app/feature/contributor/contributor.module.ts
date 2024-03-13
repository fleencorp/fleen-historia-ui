import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ContributorRoutingModule} from './contributor-routing.module';
import {
  ContributorBaseComponent,
  ContributorDashboardComponent,
  MyReviewHistoryComponent,
  PendingVideoComponent,
  PendingVideosComponent,
  ReviewHistoryComponent,
  SubmitVideoReviewComponent
} from './component';
import {SharedModule} from "@app/shared/shared.module";
import {ContributorService} from "@app/feature/contributor/service";


@NgModule({
  declarations: [
    PendingVideosComponent,
    PendingVideoComponent,
    SubmitVideoReviewComponent,
    ReviewHistoryComponent,
    MyReviewHistoryComponent,
    ContributorBaseComponent,
    ContributorDashboardComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ContributorRoutingModule
  ],
  providers: [
    ContributorService
  ]
})
export class ContributorModule { }
