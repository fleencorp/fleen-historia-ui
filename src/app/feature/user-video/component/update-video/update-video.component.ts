import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormControl} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {UserVideoService} from "@app/feature/user-video/service";
import {BaseUpdateVideoComponent} from "@app/base/component/video";
import {faArrowLeft, faInfo, faSpinner, faVideo, IconDefinition} from "@fortawesome/free-solid-svg-icons";
import {VideoStatus} from "@app/model/enum";
import {isFalsy} from "@app/shared/helper";
import {MoveToDraftResponse} from "@app/model/response/video";
import {ErrorResponse} from "@app/model/response";
import {VIDEO_UNMOVED_TO_DRAFT} from "@app/constant";
import {FleenVideoView} from "@app/model/view/video";

@Component({
  selector: 'app-update-video',
  templateUrl: './update-video.component.html',
  styleUrls: ['./update-video.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class UpdateVideoComponent extends BaseUpdateVideoComponent implements OnInit {

  public videoStatusCtrl: FormControl = new FormControl({value: 'enabled', disabled: true});

  public constructor(
      protected userVideoService: UserVideoService,
      formBuilder: FormBuilder,
      router: Router,
      route: ActivatedRoute) {
    super(userVideoService, formBuilder, router, route);
  }

  public async ngOnInit(): Promise<void> {
    this.enableLoading();
    await this.initEntry(this.start.bind(this));
  }

  protected override start(): void {
    super.start();
    this.enableTransitionToDraft();
  }

  public disableTransitionToDraft(): void {
    this.videoStatusCtrl.disable();
  }

  public enableTransitionToDraft(): void {
    if (this.isVideoStatusInReview) {
      this.videoStatusCtrl.enable();
    }
  }

  override get canUpdateVideoInfoOrObject(): boolean {
    return !(this.startUpdateVideoInfo)
      && !(this.startUpdateVideoObject);
  }

  get isVideoStatusInReview(): boolean {
    return this.fleenVideo.videoStatus === VideoStatus.IN_REVIEW;
  }

  public moveBackToDraft(): void {
    this.clearAllMessages();
    if (isFalsy(this.isSubmitting) && this.fleenVideo.videoStatus === VideoStatus.IN_REVIEW) {
      this.disableSubmittingAndResetErrorMessage();

      this.userVideoService.moveVideoBackToDraft(this.entryId)
        .subscribe({
          next: (result: MoveToDraftResponse): void => { this.updateStatus(result); },
          error: (error: ErrorResponse): void => { this.handleError(error); },
          complete: (): void => { this.enableSubmitting(); }
      });
    } else if (this.fleenVideo.videoStatus !== VideoStatus.IN_REVIEW) {
      this.setErrorMessage(VIDEO_UNMOVED_TO_DRAFT);
    }
  }

  public updateStatus(result: MoveToDraftResponse): void {
    const { movedToDraft } = result;
    this.setStatusMessage(result.message);
    if (movedToDraft) {
      this.entryView = new FleenVideoView({ ...(this.fleenVideo), videoStatus: VideoStatus.DRAFT });
      this.disableTransitionToDraft();
    }
  }

  protected readonly faVideo: IconDefinition = faVideo;
  protected readonly faArrowLeft: IconDefinition = faArrowLeft;
  protected readonly faInfo: IconDefinition = faInfo;
  protected readonly VideoStatus = VideoStatus;
  protected readonly faSpinner: IconDefinition = faSpinner;
}
