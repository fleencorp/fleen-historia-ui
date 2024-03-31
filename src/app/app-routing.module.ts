import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {AppComponent} from "./app.component";
import {AuthGuard} from "@app/base/guard";
import {FleenComgroupComponent} from "@app/base/component";

const routes: Routes = [
  { path: "", component: AppComponent },
  { path: 'auth', loadChildren: () => import('./feature/authentication/authentication.module').then(m => m.AuthenticationModule) },
  { path: 'mfa', loadChildren: () => import('./feature/mfa/mfa.module').then(m => m.MfaModule), canActivate: [AuthGuard] },
  { path: 'profile', loadChildren: () => import('./feature/member/member.module').then(m => m.MemberModule), canActivate: [AuthGuard] },
  { path: 'user-video', loadChildren: () => import('./feature/user-video/user-video.module').then(m => m.UserVideoModule), canActivate: [AuthGuard] },
  { path: 'contributor', loadChildren: () => import('./feature/contributor/contributor.module').then(m => m.ContributorModule), canActivate: [AuthGuard] },
  { path: 'admin-youtube', loadChildren: () => import('./feature/admin/admin-youtube/admin-youtube.module').then(m => m.AdminYoutubeModule), canActivate: [AuthGuard] },
  { path: 'admin-video', loadChildren: () => import('./feature/admin/admin-video/admin-video.module').then(m => m.AdminVideoModule), canActivate: [AuthGuard] },
  { path: "**", component: FleenComgroupComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
