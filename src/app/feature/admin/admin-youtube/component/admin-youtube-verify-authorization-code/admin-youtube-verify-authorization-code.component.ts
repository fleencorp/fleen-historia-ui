import {Component} from '@angular/core';
import {BaseFormImplComponent} from "@app/base/component";
import {isFalsy} from "@app/shared/helper";
import {ErrorResponse} from "@app/model/response";
import {AdminYoutubeService} from "@app/feature/admin/admin-youtube/service";
import {FormControl} from "@angular/forms";
import {minLength, required} from "@app/shared/validator";

@Component({
  selector: 'app-admin-youtube-verify-authorization-code',
  templateUrl: './admin-youtube-verify-authorization-code.component.html'
})
export class AdminYoutubeVerifyAuthorizationCodeComponent extends BaseFormImplComponent {

  public authorizationCodeCtrl: FormControl = new FormControl<string>('', [required, minLength(10)]);

  public constructor(
      protected youTubeService: AdminYoutubeService) {
    super();
  }

  public ngOnInit(): void {
    this.formReady();
  }

  public verifyAuthorizationCode(): void {
    if (isFalsy(this.isSubmitting) && this.isAuthorizationCodeValid()) {
      this.disableSubmittingAndResetErrorMessage();

      this.youTubeService.verifyAuthorizationCodeAndInitializeCredentials(this.getAuthorizationCode())
        .subscribe({
          next: (): void => { this.handleCompletedVerificationOfCode(); },
          error: (error: ErrorResponse): void => { this.handleError(error); },
          complete: async (): Promise<void> => { this.enableSubmitting(); }
      });
    }
  }

  public handleCompletedVerificationOfCode(): void {
    this.formCompleted();
    this.authorizationCodeCtrl.patchValue('');
    this.authorizationCodeCtrl.reset();
  }

  private isAuthorizationCodeValid(): boolean {
    return this.authorizationCodeCtrl?.valid;
  }

  private getAuthorizationCode(): string {
    return this.authorizationCodeCtrl?.value;
  }

}
