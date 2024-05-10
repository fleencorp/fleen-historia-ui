import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {GoogleYoutubeOauthRoutingModule} from './google-youtube-oauth-routing.module';
import {
  BaseCreateUpdateGoogleClientCredentialService,
  GoogleYoutubeOauthService
} from "@app/feature/admin/google-youtube-oauth/service";
import {
  AddChannelRefreshChannelTokenComponent,
  AddClientCredentialComponent,
  AddUpdateClientCredentialComponent,
  ClientCredentialChannelEntriesComponent,
  ClientCredentialDetailComponent,
  ClientCredentialEntriesComponent,
  GoogleOauthYoutubeBaseComponent,
  GoogleOauthYoutubeDashboardComponent,
  UpdateClientCredentialComponent
} from "@app/feature/admin/google-youtube-oauth/component";
import {ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "@app/shared/shared.module";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {RouterLinkActive} from "@angular/router";
import {BaseModule} from "@app/base/base.module";


@NgModule({
  declarations: [
    AddUpdateClientCredentialComponent,
    AddChannelRefreshChannelTokenComponent,
    AddClientCredentialComponent,
    UpdateClientCredentialComponent,
    ClientCredentialChannelEntriesComponent,
    ClientCredentialEntriesComponent,
    ClientCredentialDetailComponent,
    GoogleOauthYoutubeBaseComponent,
    GoogleOauthYoutubeDashboardComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    FontAwesomeModule,
    RouterLinkActive,
    GoogleYoutubeOauthRoutingModule,
    BaseModule
  ],
  providers: [
    GoogleYoutubeOauthService,
    BaseCreateUpdateGoogleClientCredentialService
  ]
})
export class GoogleYoutubeOauthModule { }
