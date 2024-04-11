import {Component, EventEmitter, Output, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-video-detail-option',
  templateUrl: './video-detail-option.component.html',
  styleUrls: ['./video-detail-option.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class VideoDetailOptionComponent {

  @Output('detail-view')
  public detailView: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output('review-history-view')
  public reviewHistoryView: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output('comment-view')
  public commentView: EventEmitter<boolean> = new EventEmitter<boolean>();

  public showDetailsView(): void {
    this.detailView.emit(true);
  }

  public showReviewHistoryView(): void {
    this.reviewHistoryView.emit(true);
  }

  public showCommentsView(): void {
    this.commentView.emit(true);
  }
}
