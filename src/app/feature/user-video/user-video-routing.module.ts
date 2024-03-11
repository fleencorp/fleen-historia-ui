import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from "@app/base/guard";
import {
  CreateVideoComponent,
  RequestReviewComponent,
  UpdateVideoComponent,
  UserVideoBaseComponent, UserVideoComponent,
  UserVideoDashboardComponent,
  UserVideosComponent
} from "@app/feature/user-video/component";

const routes: Routes = [
  { path: '',
    canActivate: [AuthGuard],
    component: UserVideoBaseComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: UserVideoDashboardComponent, title: 'User Video Dashboard' },
      { path: 'entries', component: UserVideosComponent, title: 'User Videos' },
      { path: 'user-video/:id', component: UserVideoComponent, title: 'User Video' },
      { path: 'update-video', component: UpdateVideoComponent, title: 'Update Video' },
      { path: 'create-video', component: CreateVideoComponent, title: 'Submit a Video' },
      { path: 'request-review', component: RequestReviewComponent, title: 'Request Review' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserVideoRoutingModule { }