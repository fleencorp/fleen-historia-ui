import {Component, OnInit} from '@angular/core';
import {BaseDetailComponent} from "@app/base/component";
import {FleenVideoView} from "@app/model/view/video";
import {ActivatedRoute, Router} from "@angular/router";
import {Observable} from "rxjs";
import {ContributorService} from "@app/feature/contributor/service";
import {enumValid, maxLength, required} from "@app/shared/validator";
import {VideoReviewStatus} from "@app/model/enum";
import {AbstractControl, FormBuilder, FormGroup} from "@angular/forms";
import {isFalsy} from "@app/shared/helper";
import {ErrorResponse} from "@app/model/response";
import {UserCanSubmitReviewResponse} from "@app/model/response/video";
import {SubmitVideoReviewResponse} from "@app/model/response/video/submit-video-review.response";

@Component({
  selector: 'app-pending-video',
  templateUrl: './pending-video.component.html',
  styleUrls: ['./pending-video.component.css']
})
export class PendingVideoComponent extends BaseDetailComponent<FleenVideoView> implements OnInit {

  public override entryView!: FleenVideoView;
  public hasSubmittedReview: boolean = false;
  protected override formBuilder;

  public constructor(protected contributorService: ContributorService,
                     formBuilder: FormBuilder,
                     router: Router,
                     route: ActivatedRoute) {
    super(router, route);
    this.formBuilder = formBuilder;
  }

  public async ngOnInit(): Promise<void> {
    await this.initEntry(this.checkCanUserSubmitAVideoReview.bind(this));
  }

  protected override initForm(): void {
    this.fleenForm = this.formBuilder.group({
      videoReviewStatus: ['', [required, enumValid(VideoReviewStatus)]],
      comment: ['', [maxLength(2000)]]
    });
    this.formReady();
  }

  protected override getServiceEntry(id: number | string): Observable<FleenVideoView> {
    return this.contributorService.findPendingVideo(id);
  }

  get fleenVideoView(): FleenVideoView {
    return this.entryView;
  }

  public submitReview(): void {
    if (isFalsy(this.isSubmitting) && this.fleenForm.valid) {
      this.disableSubmittingAndResetErrorMessage();
      this.clearMessages();

      this.contributorService.submitVideoReview(this.entryView.videoId, this.fleenForm.value)
        .subscribe({
          next: (result: SubmitVideoReviewResponse): void => {
            this.setStatusMessage(result.message);
            this.confirmUserHasSubmittedReview(true);
          },
          error: (error: ErrorResponse): void => { this.handleError(error); },
          complete: (): void => { this.enableSubmitting(); }
      });
    }
  }

  private checkCanUserSubmitAVideoReview(): void {
    this.contributorService.userCanSubmitVideoReview(this.entryId)
      .subscribe({
        next: (result: UserCanSubmitReviewResponse): void => { this.confirmUserHasSubmittedReview(result.hasSubmittedReview); },
        error: (error: ErrorResponse): void => { this.handleError(error); }
    });
  }

  private confirmUserHasSubmittedReview(canSubmit: boolean): void {
    this.hasSubmittedReview = canSubmit;
  }

  get canSubmitReview(): boolean {
    return !(this.hasSubmittedReview);
  }

  get submitReviewForm(): FormGroup {
    return this.fleenForm;
  }

  get videoReviewStatus(): AbstractControl | null | undefined {
    return this.submitReviewForm?.get('videoReviewStatus');
  }

  get comment(): AbstractControl | null | undefined {
    return this.submitReviewForm?.get('comment');
  }

}
