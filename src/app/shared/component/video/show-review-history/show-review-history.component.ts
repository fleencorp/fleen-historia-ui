import {Component, Input, ViewEncapsulation} from '@angular/core';
import {VideoReviewView} from "@app/model/view/video";

@Component({
  selector: 'app-show-review-history',
  templateUrl: './show-review-history.component.html',
  styleUrls: ['./show-review-history.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ShowReviewHistoryComponent {

  @Input('review-history')
  public reviews: VideoReviewView[] = [];
}
