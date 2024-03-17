import {Component, OnInit} from '@angular/core';
import {BaseFormImplComponent} from "@app/base/component";
import {AdminYoutubeService} from "@app/feature/admin/admin-youtube/service";
import {isFalsy} from "@app/shared/helper";
import {ErrorResponse} from "@app/model/response";
import {YouTubeApiStartAuthenticationResponse} from "@app/model/response/youtube";
import {AbstractControl, FormControl} from "@angular/forms";

@Component({
  selector: 'app-admin-youtube-authentication',
  templateUrl: './admin-youtube-authentication.component.html',
  styleUrls: ['./admin-youtube-authentication.component.css']
})
export class AdminYoutubeAuthenticationComponent extends BaseFormImplComponent implements OnInit {

  private authorizationUriCtrl: FormControl = new FormControl<string>('');

  public constructor(protected youTubeService: AdminYoutubeService) {
    super();
  }

  public ngOnInit(): void {
    this.formReady();
  }

  public startAuthentication(): void {
    if (isFalsy(this.isSubmitting)) {
      this.disableSubmittingAndResetErrorMessage();

      this.youTubeService.startAuthentication()
        .subscribe({
          next: (result: YouTubeApiStartAuthenticationResponse): void => { this.authorizationUri = result; },
          error: (error: ErrorResponse): void => { this.handleError(error); },
          complete: async (): Promise<void> => { this.enableSubmitting(); }
      });
    }
  }

  set authorizationUri(result: YouTubeApiStartAuthenticationResponse) {
    this.authorizationUriCtrl.patchValue(result.authorizationUri);
  }

  get authorizationUri(): AbstractControl | null | undefined {
    return this.authorizationUriCtrl?.value;
  }

}
