import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard, AuthRoleGuard} from "@app/base/guard";
import {DashboardComponent, FleenComgroupComponent} from "@app/base/component";
import {HomepageVideoComponent, HomepageVideosComponent} from "@app/shared/component";
import {ForbiddenComponent} from "@app/base/component/forbidden/forbidden.component";

const routes: Routes = [
  { path: '', component: HomepageVideosComponent },
  { path: 'video/:id', component: HomepageVideoComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'videos', component: HomepageVideosComponent },
  { path: 'auth', loadChildren: () => import('./feature/authentication/authentication.module').then(m => m.AuthenticationModule) },
  { path: 'mfa', loadChildren: () => import('./feature/mfa/mfa.module').then(m => m.MfaModule), canActivate: [AuthGuard] },
  { path: 'profile', loadChildren: () => import('./feature/member/member.module').then(m => m.MemberModule), canActivate: [AuthGuard] },
  { path: 'user-video', loadChildren: () => import('./feature/user-video/user-video.module').then(m => m.UserVideoModule), canActivate: [AuthGuard] },
  { path: 'contributor', loadChildren: () => import('./feature/contributor/contributor.module').then(m => m.ContributorModule), canActivate: [AuthGuard] },
  { path: 'admin-youtube', loadChildren: () => import('./feature/admin/admin-youtube/admin-youtube.module').then(m => m.AdminYoutubeModule), canActivateChild: [AuthGuard, AuthRoleGuard] },
  { path: 'admin-video', loadChildren: () => import('./feature/admin/admin-video/admin-video.module').then(m => m.AdminVideoModule), canActivateChild: [AuthGuard, AuthRoleGuard] },
  { path: 'google-youtube-oauth', loadChildren: () => import('./feature/admin/google-youtube-oauth/google-youtube-oauth.module').then(m => m.GoogleYoutubeOauthModule), canActivateChild: [AuthGuard, AuthRoleGuard] },
  { path: 'forbidden', component: ForbiddenComponent },
  { path: "**", component: FleenComgroupComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
