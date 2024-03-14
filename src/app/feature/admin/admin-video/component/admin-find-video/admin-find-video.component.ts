import {Component, OnInit} from '@angular/core';
import {BaseDetailComponent} from "@app/base/component";
import {FleenVideoView} from "@app/model/view/video";
import {ActivatedRoute, Router} from "@angular/router";
import {Observable} from "rxjs";
import {AdminVideoService} from "@app/feature/admin/admin-video/service";

@Component({
  selector: 'app-admin-find-video',
  templateUrl: './admin-find-video.component.html',
  styleUrls: ['./admin-find-video.component.css']
})
export class AdminFindVideoComponent extends BaseDetailComponent<FleenVideoView> implements OnInit {

  public override entryView!: FleenVideoView;
  protected override formBuilder;

  public constructor(
      protected adminVideoService: AdminVideoService,
      router: Router,
      route: ActivatedRoute) {
    super(router, route);
  }

  public async ngOnInit(): Promise<void> {
    await this.initEntry();
  }

  protected override getServiceEntry(id: number | string): Observable<FleenVideoView> {
    return this.adminVideoService.findVideo(id);
  }

  get fleenVideoView(): FleenVideoView {
    return this.entryView;
  }
}
