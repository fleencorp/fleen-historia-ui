import {Component, Input} from '@angular/core';
import {BaseFormComponent} from "@app/base/component";
import {FormBuilder, FormControl} from "@angular/forms";
import {Router} from "@angular/router";
import {ANY_EMPTY, DEFAULT_IMAGE_CONSTRAINT, DEFAULT_VIDEO_CONSTRAINT} from "@app/constant";
import {FileConstraints, UpdateVideoObjectPayload} from "@app/model/type";
import {ObjectService, SignedUrlService} from "@app/shared/service/impl";
import {ErrorResponse} from "@app/model/response";
import {Observable} from "rxjs";
import {DeleteResponse, SignedUrlResponse} from "@app/model/response/common";
import {UserVideoService} from "@app/feature/user-video/service";
import {FleenVideoView} from "@app/model/view/video";
import {isFalsy, isTruthy} from "@app/shared/helper";
import {required} from "@app/shared/validator";

@Component({
  selector: 'app-update-video-object',
  templateUrl: './update-video-object.component.html',
  styleUrls: ['./update-video-object.component.css']
})
export class UpdateVideoObjectComponent extends BaseFormComponent {

  public readonly photoConstraints: FileConstraints = DEFAULT_IMAGE_CONSTRAINT;
  public readonly videoConstraints: FileConstraints = DEFAULT_VIDEO_CONSTRAINT;
  protected override formBuilder!: FormBuilder;
  public videoContentUrl: string | null = null;
  public videoThumbnailUrl: string | null = null;
  public videoContent: FormControl = new FormControl<string>('', [required]);
  public videoThumbnail: FormControl = new FormControl<string>('');

  @Input('video-id')
  public videoId!: number | string;

  public constructor(protected userVideoService: UserVideoService,
                     protected signedUrlService: SignedUrlService,
                     protected objectService: ObjectService) {
    super();
  }

  protected override getRouter(): Router {
    return ANY_EMPTY;
  }

  public ngOnInit(): void {
    if (isTruthy(this.videoId)) {
      this.userVideoService.findUserVideo(this.videoId)
        .subscribe({
          next: (result: FleenVideoView): void => {
            this.videoContentUrl = result.objectUrl;
            this.videoThumbnailUrl = result.objectThumbnail;
            this.formReady();
          },
          error: (error: ErrorResponse): void => { this.handleError(error); }
      });
    }
  }

  /**
   * Handles the submission of a forgot password request.
   *
   * @param {Event} event - The event triggering the submission.
   * @returns {void}
   */
  public submit(event: Event): void {
    this.stopEvent(event);
    this.enableLoading();

    console.log(this.videoContent);

    if (this.videoContent.valid && isFalsy(this.isSubmitting)) {
      const videoContentUrl: string = this.videoContent.value.toString();
      const videoThumbnailUrl: string = this.videoThumbnail.value.toString();
      const payload: UpdateVideoObjectPayload = { objectOrVideoUrl: videoContentUrl, objectOrThumbnailUrl: videoThumbnailUrl };

      this.userVideoService.updateVideoObject(this.videoId, payload)
        .subscribe({
          next: (): void => { this.setStatusMessage('Update successful') },
          error: (result: ErrorResponse): void => { this.handleError(result); },
          complete: (): void => {
            this.enableSubmitting();
            this.disableLoading();
          },
      });
    }
  }

  get signedUrlForVideoMethod(): (...data: any[]) => Observable<SignedUrlResponse> {
    return this.signedUrlService.generateForVideoObject.bind(this.signedUrlService);
  }

  get signedUrlForVideoThumbnailMethod(): (...data: any[]) => Observable<SignedUrlResponse> {
    return this.signedUrlService.generateForVideoThumbnail.bind(this.signedUrlService);
  }

  get saveVideoMethod(): (...data: any[]) => Observable<any> {
    return this.noOpFunction$;
  }

  get saveVideoThumbnailMethod(): (...data: any[]) => Observable<any> {
    return this.noOpFunction$;
  }

  get deleteVideoMethod(): (...data: any[]) => Observable<DeleteResponse> {
    return this.objectService.deleteVideoContent.bind(this.objectService);
  }

  get deleteVideoThumbnailMethod(): (...data: any[]) => Observable<DeleteResponse> {
    return this.objectService.deleteVideoThumbnail.bind(this.objectService);
  }

  get canSubmitAndUpdateData(): boolean {
    return this.videoContent.valid;
  }
}
