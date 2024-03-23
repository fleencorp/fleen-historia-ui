import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from "@app/base/guard";
import {
  AdminCreateVideoComponent,
  AdminFindVideoComponent,
  AdminFindVideosComponent,
  AdminUpdateVideoComponent,
  AdminVideoBaseComponent,
  AdminVideoDashboardComponent
} from "@app/feature/admin/admin-video/component";

const routes: Routes = [
  { path: '',
    canActivate: [AuthGuard],
    component: AdminVideoBaseComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: AdminVideoDashboardComponent, title: 'Admin Video Dashboard' },
      { path: 'entries', component: AdminFindVideosComponent, title: 'Video Entries' },
      { path: 'detail/:id', component: AdminFindVideoComponent, title: 'Video Entry' },
      { path: 'update/:id', component: AdminUpdateVideoComponent, title: 'Update Video' },
      { path: 'create-video', component: AdminCreateVideoComponent, title: 'Submit a Video' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminVideoRoutingModule { }
