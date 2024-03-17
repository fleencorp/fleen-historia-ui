import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from "@app/base/guard";
import {
  AdminYoutubeAuthenticationComponent,
  AdminYoutubeBaseComponent,
  AdminYoutubeDashboardComponent
} from "@app/feature/admin/admin-youtube/component";

const routes: Routes = [
  { path: '',
    canActivate: [AuthGuard],
    component: AdminYoutubeBaseComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: AdminYoutubeDashboardComponent, title: 'YouTube Dashboard' },
      { path: 'auth', component: AdminYoutubeAuthenticationComponent, title: 'Authentication and Authorization' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminYoutubeRoutingModule { }
