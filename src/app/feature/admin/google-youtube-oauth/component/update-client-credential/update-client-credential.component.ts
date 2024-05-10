import {Component} from '@angular/core';
import {BaseUpdateComponent} from "@app/base/component";
import {UpdateGoogleClientCredentialPayload} from "@app/model/type/youtube-oauth.type";
import {GoogleClientCredentialView} from "@app/model/youtube/oauth";
import {
  BaseCreateUpdateGoogleClientCredentialService,
  GoogleYoutubeOauthService
} from "@app/feature/admin/google-youtube-oauth/service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Observable} from "rxjs";

@Component({
  selector: 'app-update-client-credential',
  templateUrl: './update-client-credential.component.html',
  styleUrl: './update-client-credential.component.css'
})
export class UpdateClientCredentialComponent extends BaseUpdateComponent<GoogleClientCredentialView, UpdateGoogleClientCredentialPayload> {

  public override entryView!: GoogleClientCredentialView;

  public constructor(
      protected googleYoutubeOauthService: GoogleYoutubeOauthService,
      protected baseCreateUpdateGoogleClientCredentialService: BaseCreateUpdateGoogleClientCredentialService,
      protected formBuilder: FormBuilder,
      router: Router,
      activatedRoute: ActivatedRoute) {
    super(router, activatedRoute);
  }

  public async ngOnInit(): Promise<void> {
    this.enableLoading();
    await this.initEntry();
  }

  protected $updateEntry(id: string | number, payload: UpdateGoogleClientCredentialPayload): Observable<GoogleClientCredentialView> {
    return this.googleYoutubeOauthService.updateClientCredential(id, payload);
  }

  protected getServiceEntry(id: number | string): Observable<GoogleClientCredentialView> {
    return this.googleYoutubeOauthService.findCredential(id);
  }

  protected initForm(): void {
    this.fleenForm = this.baseCreateUpdateGoogleClientCredentialService.createForm(this.entryView);
    this.formReady();
  }

  public updateClientCredential(): void {
    this.updateEntry()
  }

  get clientCredentialForm(): FormGroup {
    return this.fleenForm;
  }

  override get payload(): any {
    const payload: any = { ...(super.payload) };
    payload['redirectUris'] = payload['redirectUris'].split(',');
    payload['javascriptOrigins'] = payload['javascriptOrigins'].split(',');

    return payload;
  }

}
