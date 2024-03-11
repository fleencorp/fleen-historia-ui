import {Component, OnInit} from '@angular/core';
import {BaseDetailComponent} from "@app/base/component/base-detail/base-detail.component";
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

  public constructor(private userVideoService: UserVideoService,
                     router: Router,
                     route: ActivatedRoute) {
    super(router, route);
  }

  public ngOnInit(): void {
    this.initEntry();
  }

  protected override getServiceEntry(id: number | string): Observable<FleenVideoView> {
    return this.userVideoService.findUserVideo(id);
  }

  get fleenVideoView(): FleenVideoView {
    return this.entryView;
  }
}
