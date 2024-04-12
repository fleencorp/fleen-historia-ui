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
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {BaseModule} from "@app/base/base.module";
import { AddCommentComponent } from './component/add-comment/add-comment.component';


@NgModule({
  declarations: [
    PendingVideosComponent,
    PendingVideoComponent,
    SubmitVideoReviewComponent,
    ReviewHistoryComponent,
    MyReviewHistoryComponent,
    ContributorBaseComponent,
    ContributorDashboardComponent,
    AddCommentComponent
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
