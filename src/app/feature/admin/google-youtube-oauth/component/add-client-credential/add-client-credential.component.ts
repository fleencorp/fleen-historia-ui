import {Component} from '@angular/core';
import {BaseAddComponent} from "@app/base/component";
import {AddGoogleClientCredentialPayload} from "@app/model/type/youtube-oauth.type";
import {GoogleClientCredentialView} from "@app/model/youtube/oauth";
import {Observable} from "rxjs";
import {
  BaseCreateUpdateGoogleClientCredentialService,
  GoogleYoutubeOauthService
} from "@app/feature/admin/google-youtube-oauth/service";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-add-client-credential',
  templateUrl: './add-client-credential.component.html',
  styleUrl: './add-client-credential.component.css'
})
export class AddClientCredentialComponent extends BaseAddComponent<AddGoogleClientCredentialPayload, GoogleClientCredentialView> {

  private static readonly CLIENT_CREDENTIAL_ENTRIES_ROUTE: string[] = ['google-youtube-oauth', 'client-credential', 'entries'];

  public constructor(
      protected googleYoutubeOauthService: GoogleYoutubeOauthService,
      protected baseCreateUpdateGoogleClientCredentialService: BaseCreateUpdateGoogleClientCredentialService,
      router: Router,
      formBuilder: FormBuilder) {
    super(router, formBuilder);
  }

  public ngOnInit(): void {
    this.enableLoading();
    this.initForm();
    this.disableLoading();
  }

  protected $saveEntry(payload: AddGoogleClientCredentialPayload): Observable<GoogleClientCredentialView> {
    return this.googleYoutubeOauthService.addClientCredential(payload);
  }

  protected initForm(): void {
    this.fleenForm = this.baseCreateUpdateGoogleClientCredentialService.createForm(GoogleClientCredentialView.empty());
    this.formReady();
  }

  public createClientCredential(): void {
    this.saveEntry();
  }

  protected override async goToEntries(errorMessage: string | null = ''): Promise<void> {
    await this.getRouter().navigate(AddClientCredentialComponent.CLIENT_CREDENTIAL_ENTRIES_ROUTE, { state: { error: errorMessage } }).then((m: boolean) => m);
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
