import {Component, OnInit} from '@angular/core';
import {BaseDetailComponent} from "@app/base/component/common/base-detail.component";
import {FleenVideoView} from "@app/model/view/video";
import {UserVideoService} from "@app/feature/user-video/service/user-video.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Observable} from "rxjs";

@Component({
  selector: 'app-user-video',
  templateUrl: './user-video.component.html',
  styleUrls: ['./user-video.component.css']
})
export class UserVideoComponent extends BaseDetailComponent<FleenVideoView> implements OnInit {

  public override entryView!: FleenVideoView;
  protected override formBuilder;
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
    await this.initEntry();
  }

  protected override getServiceEntry(id: number | string): Observable<FleenVideoView> {
    return this.userVideoService.findVideo(id);
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
