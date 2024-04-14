import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FleenVideoView} from "@app/model/view/video";
import {ActivatedRoute, Router} from "@angular/router";
import {Observable} from "rxjs";
import {ContributorService} from "@app/feature/contributor/service";
import {enumValid, maxLength, required} from "@app/shared/validator";
import {VideoReviewStatus} from "@app/model/enum";
import {AbstractControl, FormBuilder, FormGroup} from "@angular/forms";
import {isFalsy} from "@app/shared/helper";
import {ErrorResponse} from "@app/model/response";
import {SubmitVideoReviewResponse, UserCanSubmitReviewResponse} from "@app/model/response/video";
import {BaseVideoComponent} from "@app/base/component/video";

@Component({
  selector: 'app-pending-video',
  templateUrl: './pending-video.component.html',
  styleUrls: ['./pending-video.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PendingVideoComponent extends BaseVideoComponent implements OnInit {

  public constructor(protected contributorService: ContributorService,
                     formBuilder: FormBuilder,
                     router: Router,
                     route: ActivatedRoute) {
    super(contributorService, router, route);
    this.formBuilder = formBuilder;
  }

  public async ngOnInit(): Promise<void> {
    this.enableLoading();
    await this.initEntry(this.checkCanUserSubmitAVideoReview.bind(this));
    this.getVideoReviewHistory();
    this.getVideoDiscussion();
  }

  protected override initForm(): void {
    this.fleenForm = this.formBuilder.group({
      videoReviewStatus: ['', [required, enumValid(VideoReviewStatus)]],
      comment: ['', [maxLength(3000)]]
    });
    this.formReady();
  }

  protected override getServiceEntry(id: number | string): Observable<FleenVideoView> {
    return this.contributorService.findPendingVideo(id);
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

  get canSubmitReview(): boolean {
    return !(this.hasSubmittedReview);
  }

  get submitReviewForm(): FormGroup {
    return this.fleenForm;
  }

  get comment(): AbstractControl | null | undefined {
    return this.submitReviewForm?.get('comment');
  }
}
