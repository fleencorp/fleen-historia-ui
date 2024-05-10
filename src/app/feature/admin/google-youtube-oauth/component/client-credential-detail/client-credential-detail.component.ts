import {Component, Input, OnInit} from '@angular/core';
import {BaseDetailComponent} from "@app/base/component";
import {GoogleClientCredentialView} from "@app/model/youtube/oauth";
import {FormBuilder} from "@angular/forms";
import {Observable} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {GoogleYoutubeOauthService} from "@app/feature/admin/google-youtube-oauth/service";

@Component({
  selector: 'app-client-credential-detail',
  templateUrl: './client-credential-detail.component.html',
  styleUrl: './client-credential-detail.component.css'
})
export class ClientCredentialDetailComponent extends BaseDetailComponent<GoogleClientCredentialView> implements OnInit {

  @Input('entry-id') public override entryId: number | string = 0;
  public override entryView!: GoogleClientCredentialView;

  public override pageTitle: string = 'Client Credential';

  public constructor(
      protected googleYoutubeOauthService: GoogleYoutubeOauthService,
      protected formBuilder: FormBuilder,
      router: Router,
      route: ActivatedRoute) {
    super(router, route);
  }

  public async ngOnInit(): Promise<void> {
    this.enableLoading();
    await this.initEntry();
  }

  protected getServiceEntry(id: number | string): Observable<GoogleClientCredentialView> {
    return this.googleYoutubeOauthService.findCredential(id);
  }

  get credential(): GoogleClientCredentialView {
    return this.entryView;
  }

}
