import {Component, OnInit} from '@angular/core';
import {ContributorService} from "@app/feature/contributor/service";
import {ActivatedRoute, Router} from "@angular/router";
import {Observable} from "rxjs";
import {BaseDetailComponent} from "@app/base/component";
import {VideoReviewHistoryResponse} from "@app/model/response/video/video-review-history.response";

@Component({
  selector: 'app-review-history',
  templateUrl: './review-history.component.html',
  styleUrls: ['./review-history.component.css']
})
export class ReviewHistoryComponent  extends BaseDetailComponent<VideoReviewHistoryResponse> implements OnInit {

  public override entryView!: VideoReviewHistoryResponse;
  protected override formBuilder;

  public constructor(private contributorService: ContributorService,
                     router: Router,
                     route: ActivatedRoute) {
    super(router, route);
  }

  public async ngOnInit(): Promise<void> {
    await this.initEntry();
  }

  protected override getServiceEntry(id: number | string): Observable<VideoReviewHistoryResponse> {
    return this.contributorService.findVideoReviewHistory(id);
  }

  get fleenVideoReviewView(): VideoReviewHistoryResponse {
    return this.entryView;
  }
}
