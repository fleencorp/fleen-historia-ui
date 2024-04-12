import {Component, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core';
import {AbstractControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-submit-video-review',
  templateUrl: './submit-video-review.component.html',
  styleUrls: ['./submit-video-review.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SubmitVideoReviewComponent {

  @Input('submit-review-form') public submitReviewForm!: FormGroup;
  @Input('is-submitting') public isSubmitting: boolean = false;
  @Input('status-message') public statusMessage: string = '';
  @Input('error-message') public errorMessage: string = '';

  @Output('submit-review') submitReview: EventEmitter<void> = new EventEmitter<void>();

  public constructor() { }

  public onSubmit(): void {
    this.submitReview.emit();
  }

  get videoReviewStatus(): AbstractControl | null | undefined {
    return this.submitReviewForm?.get('videoReviewStatus');
  }

  get comment(): AbstractControl | null | undefined {
    return this.submitReviewForm?.get('comment');
  }

}
