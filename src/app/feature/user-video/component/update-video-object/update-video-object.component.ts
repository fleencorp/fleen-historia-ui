import {Component, Input} from '@angular/core';
import {BaseFormComponent} from "@app/base/component";
import {FormBuilder, FormControl} from "@angular/forms";
import {Router} from "@angular/router";
import {ANY_EMPTY, DEFAULT_IMAGE_CONSTRAINT, DEFAULT_VIDEO_CONSTRAINT} from "@app/constant";
import {FileConstraints} from "@app/model/type";
import {ObjectService, SignedUrlService} from "@app/shared/service/impl";
import {ErrorResponse} from "@app/model/response";
import {Observable} from "rxjs";
import {DeleteResponse, SignedUrlResponse} from "@app/model/response/common";
import {UserVideoService} from "@app/feature/user-video/service";
import {FleenVideoView} from "@app/model/view/video";
import {isTruthy} from "@app/shared/helper";

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
  public videoContent: FormControl = new FormControl<string>('');
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

  get signedUrlForVideoMethod(): (...data: any[]) => Observable<SignedUrlResponse> {
    return this.signedUrlService.generateForVideoObject.bind(this.signedUrlService);
  }

  get signedUrlForVideoThumbnailMethod(): (...data: any[]) => Observable<SignedUrlResponse> {
    return this.signedUrlService.generateForVideoThumbnail.bind(this.signedUrlService);
  }

  get saveVideoMethod(): (...data: any[]) => Observable<any> {
    return ANY_EMPTY;
  }

  get saveVideoThumbnailMethod(): (...data: any[]) => Observable<any> {
    return ANY_EMPTY;
  }

  get deleteVideoMethod(): (...data: any[]) => Observable<DeleteResponse> {
    return this.objectService.deleteVideoContent.bind(this.objectService);
  }

  get deleteVideoThumbnailMethod(): (...data: any[]) => Observable<DeleteResponse> {
    return this.objectService.deleteVideoThumbnail.bind(this.objectService);
  }
}
