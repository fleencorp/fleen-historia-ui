import {Component, OnInit} from '@angular/core';
import {BaseFormImplComponent} from "@app/base/component";
import {faCopy, IconDefinition} from "@fortawesome/free-solid-svg-icons";
import {AdminYoutubeService} from "@app/feature/admin/admin-youtube/service";
import {Clipboard} from "@angular/cdk/clipboard";
import {isFalsy, isTruthy} from "@app/shared/helper";
import {YouTubeApiStartAuthenticationResponse} from "@app/model/response/youtube";
import {ErrorResponse} from "@app/model/response";

@Component({
  selector: 'app-admin-youtube-start-authentication',
  templateUrl: './admin-youtube-start-authentication.component.html'
})
export class AdminYoutubeStartAuthenticationComponent extends BaseFormImplComponent implements OnInit {

  protected authorizationUri: string = '';


  public constructor(
      protected youTubeService: AdminYoutubeService,
      protected clipBoard: Clipboard) {
    super();
  }

  public ngOnInit(): void {
    this.formReady();
  }

  public startAuthentication(): void {
    if (isFalsy(this.isSubmitting)) {
      this.disableSubmittingAndResetErrorMessage();
      this.resetAuthorizationUri();

      this.youTubeService.startAuthentication()
        .subscribe({
          next: (result: YouTubeApiStartAuthenticationResponse): void => {
            this.formCompleted();
            this.authorizationUri = result.authorizationUri;
          },
          error: (error: ErrorResponse): void => { this.handleError(error); },
          complete: async (): Promise<void> => { this.enableSubmitting(); }
      });
    }
  }

  public copyAuthorizationUriToClipboard(): void {
    this.clipBoard.copy(this.authorizationUri);
  }

  get isAuthorizationUriAvailable(): string {
    return isTruthy(this.authorizationUri)
      ? 'Authorization Ready'
      : '';
  }

  protected resetAuthorizationUri(): void {
    this.authorizationUri = '';
  }

  protected readonly faCopy: IconDefinition = faCopy;
}
