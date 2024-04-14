import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ContributorRoutingModule} from './contributor-routing.module';
import {
  ContributorBaseComponent,
  ContributorDashboardComponent,
  MyReviewHistoryComponent,
  PendingVideoComponent,
  PendingVideosComponent,
  SubmitVideoReviewComponent
} from './component';
import {SharedModule} from "@app/shared/shared.module";
import {ContributorService} from "@app/feature/contributor/service";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {BaseModule} from "@app/base/base.module";


@NgModule({
  declarations: [
    PendingVideosComponent,
    PendingVideoComponent,
    SubmitVideoReviewComponent,
    MyReviewHistoryComponent,
    ContributorBaseComponent,
    ContributorDashboardComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ContributorRoutingModule,
    FontAwesomeModule,
    BaseModule
  ],
  providers: [
    ContributorService
  ]
})
export class ContributorModule { }
