import {Component} from '@angular/core';
import {FormBuilder, FormControl} from "@angular/forms";
import {minLength, required} from "@app/shared/validator";
import {GoogleYoutubeOauthService} from "@app/feature/admin/google-youtube-oauth/service";
import {Clipboard} from "@angular/cdk/clipboard";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {isFalsy, isTruthy} from "@app/shared/helper";
import {YouTubeApiStartAuthenticationResponse} from "@app/model/response/youtube";
import {ErrorResponse} from "@app/model/response";
import {faArrowLeft, faArrowRight, faCopy, IconDefinition} from "@fortawesome/free-solid-svg-icons";
import {BaseDetailComponent} from "@app/base/component";
import {Observable} from "rxjs";
import {GoogleClientCredentialView} from "@app/model/youtube/oauth";

@Component({
  selector: 'app-add-channel-refresh-channel-token',
  templateUrl: './add-channel-refresh-channel-token.component.html',
  styleUrl: './add-channel-refresh-channel-token.component.css'
})
export class AddChannelRefreshChannelTokenComponent extends BaseDetailComponent<GoogleClientCredentialView> {

  protected override formBuilder!: FormBuilder;
  public override entryView!: GoogleClientCredentialView;
  public isGettingAuthorizationUri: boolean = false;
  public isGettingAuthorizationUriCompleted: boolean = false;
  public isVerifyingAuthorizationCode: boolean = false;
  public isVerifyingAuthorizationCodeCompleted: boolean = false;
  public authorizationCode: string = '';

  protected authorizationUri: string = '';
  protected authorizationUriMessage: string = 'Authorization URI Ready';
  public authorizationCodeCtrl: FormControl = new FormControl<string>('', [required, minLength(10)]);

  public constructor(
      protected googleYoutubeOauthService: GoogleYoutubeOauthService,
      protected clipBoard: Clipboard,
      route: ActivatedRoute,
      router: Router) {
    super(router, route);
  }

  public override async initEntry(cb?: Function): Promise<void> {
    this.route.queryParams.subscribe(async (params: Params): Promise<void> => {
      this.authorizationCode = params['code'];
      if (isTruthy(this.authorizationCode)) {
        this.checkIfCompletedAuthorizationAndExtractCredentialId();
        this.formReady();
        this.invokeCallbackWithDelay((): void => {
          this.disableLoading();
        });
        this.invokeCallback(cb);
      } else {
        const id: number | string | null | any = params['id'] || this.entryId;
        await this.initAndGetEntry(id, cb);
      }
    });
  }

  public async ngOnInit(): Promise<void> {
    this.enableLoading();
    await this.initEntry((): void => {
      this.initDetails();
      this.formReady();
      this.authorizationCodeCtrl.patchValue(this.authorizationCode);
    });
  }

  public checkIfCompletedAuthorizationAndExtractCredentialId(): void {
    const params: Params = this.route.snapshot.queryParams;
    const stateParam = params['state'];
    if (stateParam) {
      // Decode the stateParam (which is URL encoded) to get the actual state string
      const stateString: string = decodeURIComponent(stateParam);
      // Parse the state string to extract the credential_id parameter value
      const credentialIdMatch: RegExpMatchArray | null = stateString.match(/credential_id=(\d+)/);
      if (credentialIdMatch) {
        // Extract the credential_id parameter value
        this.entryId = credentialIdMatch[1];
      }
    }
  }

  protected override getRoute(): ActivatedRoute {
    return this.route;
  }

  protected override getServiceEntry(id: number | string): Observable<GoogleClientCredentialView> {
    return this.googleYoutubeOauthService.findCredential(id);
  }


  protected enableIsGettingAuthorizationUri(): void {
    this.isGettingAuthorizationUri = true;
  }

  protected disableIsGettingAuthorizationUri(): void {
    this.isGettingAuthorizationUri = false;
  }

  protected enableIsVerifyingAuthorizationCode(): void {
    this.isVerifyingAuthorizationCode = true;
  }

  protected disableIsVerifyingAuthorizationCode(): void {
    this.isVerifyingAuthorizationCode = false;
  }

  protected enableIsGettingAuthorizationUriCompleted(): void {
    this.isGettingAuthorizationUri = true;
  }

  protected disableIsGettingAuthorizationUriCompleted(): void {
    this.isGettingAuthorizationUri = false;
  }

  protected enableIsVerifyingAuthorizationCodeCompleted(): void {
    this.isVerifyingAuthorizationCodeCompleted = true;
  }

  protected disableIsVerifyingAuthorizationCodeCompleted(): void {
    this.isVerifyingAuthorizationCodeCompleted = false;
  }

  public redirectAndStartAuthorizationWithoutHistory(): void {
    window.location.replace(this.authorizationUri);
  }

  public getAuthorizationUriForClientCredential(): void {
    if (isFalsy(this.isGettingAuthorizationUri)) {
      this.clearAllMessages();
      this.enableIsGettingAuthorizationUri();
      this.resetAuthorizationUri();

      this.googleYoutubeOauthService.getAuthorizationUriByCredential(this.entryId)
        .subscribe({
          next: (result: YouTubeApiStartAuthenticationResponse): void => {
            this.enableIsGettingAuthorizationUriCompleted();
            this.disableIsGettingAuthorizationUri();
            this.authorizationUri = result.authorizationUri;
            this.formCompleted((): void => {
              this.disableIsGettingAuthorizationUriCompleted();
            });
          },
          error: (error: ErrorResponse): void => {
            this.handleError(error);
            this.disableIsGettingAuthorizationUri();
          }
        });
    }
  }

  public verifyAuthorizationCodeAndAddChannelOrRefreshToken(): void {
    if (isFalsy(this.isVerifyingAuthorizationCode) && this.isAuthorizationCodeValid()) {
      this.clearAllMessages();
      this.enableIsVerifyingAuthorizationCode();

      this.googleYoutubeOauthService.verifyAuthorizationCodeAndAddChannelOrRefreshToken(this.entryId, this.getAuthorizationCode())
        .subscribe({
          next: (): void => {
            this.handleCompletedVerificationOfCode();
            this.disableIsVerifyingAuthorizationCode();
            this.enableIsVerifyingAuthorizationCodeCompleted();
            this.formCompleted((): void => {
              this.disableIsVerifyingAuthorizationCodeCompleted();
            });
          },
          error: (error: ErrorResponse): void => {
            this.handleError(error);
            this.disableIsVerifyingAuthorizationCode();
          }
        });
    }
  }

  public goBack(): void {
    this.navigateTo(['..', 'entries'], {}, { relativeTo: this.route });
  }

  public copyAuthorizationUriToClipboard(): void {
    this.clipBoard.copy(this.authorizationUri);
    this.setAndRestoreAfterDelay('authorizationUriMessage');
  }

  get isAuthorizationUriAvailable(): string {
    return isTruthy(this.authorizationUri)
      ? this.authorizationUriMessage
      : '';
  }

  protected resetAuthorizationUri(): void {
    this.authorizationUri = '';
  }

  public handleCompletedVerificationOfCode(): void {
    this.authorizationCodeCtrl.patchValue('');
    this.authorizationCodeCtrl.reset();
  }

  private isAuthorizationCodeValid(): boolean {
    return this.authorizationCodeCtrl?.valid;
  }

  private getAuthorizationCode(): string {
    return this.authorizationCodeCtrl?.value;
  }

  protected readonly faCopy: IconDefinition = faCopy;

  protected readonly faArrowRight = faArrowRight;
  protected readonly faArrowLeft = faArrowLeft;
}
