import {Component, OnInit} from '@angular/core';
import {BaseDetailComponent} from "@app/base/component";
import {FleenVideoView, VideoReviewView} from "@app/model/view/video";
import {ActivatedRoute, Router} from "@angular/router";
import {Observable} from "rxjs";
import {ContributorService} from "@app/feature/contributor/service";
import {SubmitVideoReviewPayload} from "@app/model/type";
import {enumValid, maxLength, required} from "@app/shared/validator";
import {VideoReviewStatus} from "@app/model/enum";
import {FormGroup} from "@angular/forms";
import {isFalsy} from "@app/shared/helper";
import {ErrorResponse, FleenResponse} from "@app/model/response";

@Component({
  selector: 'app-pending-video',
  templateUrl: './pending-video.component.html',
  styleUrls: ['./pending-video.component.css']
})
export class PendingVideoComponent extends BaseDetailComponent<FleenVideoView> implements OnInit {

  public override entryView!: FleenVideoView;
  protected override formBuilder;

  public constructor(private contributorService: ContributorService,
                     router: Router,
                     route: ActivatedRoute) {
    super(router, route);
  }

  public async ngOnInit(): Promise<void> {
    await this.initEntry(this.initForm.bind(this));
  }

  protected override initForm(): void {
    this.fleenForm = this.formBuilder.group({
      videoReviewStatus: ['', [required, enumValid(VideoReviewStatus)]],
      comment: ['', [maxLength(2000)]]
    });
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
          next: (result: VideoReviewView): void => { this.setStatusMessage('Success'); },
          error: (error: ErrorResponse): void => { this.handleError(error); },
          complete: (): void => { this.enableSubmitting(); }
      });
    }
  }

  get submitReviewForm(): FormGroup {
    return this.fleenForm;
  }

}
