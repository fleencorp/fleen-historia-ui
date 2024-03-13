import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from "@app/base/guard";
import {
  ContributorBaseComponent,
  ContributorDashboardComponent,
  MyReviewHistoryComponent,
  PendingVideoComponent,
  PendingVideosComponent
} from "@app/feature/contributor/component";

const routes: Routes = [
  { path: '',
    canActivate: [AuthGuard],
    component: ContributorBaseComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: ContributorDashboardComponent, title: 'Contributor Dashboard' },
      { path: 'entries', component: PendingVideosComponent, title: 'Pending Videos' },
      { path: 'detail/:id', component: PendingVideoComponent, title: 'Pending Video' },
      { path: 'review-history', component: MyReviewHistoryComponent, title: 'Review History' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContributorRoutingModule { }
