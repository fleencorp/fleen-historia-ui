import {Component, OnInit} from '@angular/core';
import {BaseDetailComponent} from "@app/base/component/common/base-detail.component";
import {FleenVideoView} from "@app/model/view/video";
import {UserVideoService} from "@app/feature/user-video/service/user-video.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Observable} from "rxjs";
import {VideoCommentResponse} from "@app/model/response/video/video-discussion.response";
import {VideoReviewHistoryResponse} from "@app/model/response/video";
import {FormBuilder} from "@angular/forms";

@Component({
  selector: 'app-user-video',
  templateUrl: './user-video.component.html',
  styleUrls: ['./user-video.component.css']
})
export class UserVideoComponent extends BaseDetailComponent<FleenVideoView> implements OnInit {

  public override entryView!: FleenVideoView;
  public discussion: VideoCommentResponse = new VideoCommentResponse({} as VideoCommentResponse);
  public reviewHistory: VideoReviewHistoryResponse = new VideoReviewHistoryResponse({} as VideoReviewHistoryResponse);
  protected override formBuilder!: FormBuilder;
  protected isDetailsView: boolean = true;
  protected isCommentsView: boolean = false;
  protected isReviewHistoryView: boolean = false;

  public constructor(
      protected userVideoService: UserVideoService,
      router: Router,
      route: ActivatedRoute) {
    super(router, route);
  }

  public async ngOnInit(): Promise<void> {
    this.enableLoading();
    await this.initEntry();
    this.getVideoReviewHistory();
    this.getVideoDiscussion();
  }

  protected override getServiceEntry(id: number | string): Observable<FleenVideoView> {
    return this.userVideoService.findVideo(id);
  }

  private getVideoReviewHistory(): void {
    this.userVideoService.findVideoReviewHistory(this.entryId)
      .subscribe({
        next: (result: VideoReviewHistoryResponse): void => { this.reviewHistory = result; }
    });
  }

  private getVideoDiscussion(): void {
    this.userVideoService.findVideoDiscussion(this.entryId)
      .subscribe({
        next: (result: VideoCommentResponse): void => { this.discussion = result; }
    });
  }

  public detailsView(): void {
    this.isCommentsView = false;
    this.isReviewHistoryView = false;
    this.isDetailsView = true;
  }

  public commentsView(): void {
    this.isDetailsView = false;
    this.isReviewHistoryView = false;
    this.isCommentsView = true;
  }

  public reviewHistoryView(): void {
    this.isDetailsView = false;
    this.isCommentsView = false;
    this.isReviewHistoryView = true;
  }

  get fleenVideo(): FleenVideoView {
    return this.entryView;
  }
}
