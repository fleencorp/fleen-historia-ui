import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FleenVideoView} from "@app/model/view/video";
import {UserVideoService} from "@app/feature/user-video/service";
import {ActivatedRoute, Router} from "@angular/router";
import {Observable} from "rxjs";
import {BaseVideoComponent} from "@app/base/component/video";

@Component({
  selector: 'app-user-video',
  templateUrl: './user-video.component.html',
  styleUrls: ['./user-video.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class UserVideoComponent extends BaseVideoComponent implements OnInit {

  public constructor(
      protected userVideoService: UserVideoService,
      router: Router,
      route: ActivatedRoute) {
    super(userVideoService, router, route);
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

}
