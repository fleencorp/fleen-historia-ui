import {NgModule} from "@angular/core";
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from "@app/base/guard";
import {
  AddChannelRefreshChannelTokenComponent,
  AddClientCredentialComponent,
  ClientCredentialChannelEntriesComponent,
  ClientCredentialDetailComponent,
  ClientCredentialEntriesComponent,
  GoogleOauthYoutubeBaseComponent,
  GoogleOauthYoutubeDashboardComponent,
  UpdateClientCredentialComponent
} from "@app/feature/admin/google-youtube-oauth/component";


const routes: Routes = [
  { path: '',
    canActivate: [AuthGuard],
    component: GoogleOauthYoutubeBaseComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: GoogleOauthYoutubeDashboardComponent, title: 'Google Oauth YouTube Dashboard' },
      { path: 'client-credential/entries', component: ClientCredentialEntriesComponent, title: 'Client Credential Entries' },
      { path: 'client-credential/detail/:id', component: ClientCredentialDetailComponent, title: 'Client Credential Detail' },
      { path: 'client-credential/update/:id', component: UpdateClientCredentialComponent, title: 'Client Credential Update Detail' },
      { path: 'client-credential/channel-entries/:id', component: ClientCredentialChannelEntriesComponent, title: 'Client Credential Channel Entries' },
      { path: 'client-credential/add', component: AddClientCredentialComponent, title: 'Add Client Credential' },
      { path: 'client-credential/add-channel-refresh-token', component: AddChannelRefreshChannelTokenComponent, title: 'Add Channel Or Refresh Token' },
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GoogleYoutubeOauthRoutingModule { }
