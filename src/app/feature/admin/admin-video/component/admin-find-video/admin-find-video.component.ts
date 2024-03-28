import {Component, OnInit} from '@angular/core';
import {BaseDetailComponent} from "@app/base/component";
import {ActivatedRoute, Router} from "@angular/router";
import {Observable} from "rxjs";
import {AdminVideoService} from "@app/feature/admin/admin-video/service";
import {FleenVideoResponse} from "@app/model/response/video/fleen-video.response";
import {FleenVideoView} from "@app/model/view/video";

@Component({
  selector: 'app-admin-find-video',
  templateUrl: './admin-find-video.component.html',
  styleUrls: ['./admin-find-video.component.css']
})
export class AdminFindVideoComponent extends BaseDetailComponent<FleenVideoResponse> implements OnInit {

  public override entryView!: FleenVideoResponse;
  protected override formBuilder;

  public constructor(
      protected adminVideoService: AdminVideoService,
      router: Router,
      route: ActivatedRoute) {
    super(router, route);
  }

  public async ngOnInit(): Promise<void> {
    await this.initEntry(this.gane.bind(this));
  }

  public gane() {
    console.log(this.entryView.relatedVideos.length + " is the size of related videos");
  }

  protected override getServiceEntry(id: number | string): Observable<FleenVideoResponse> {
    return this.adminVideoService.findVideoWithRelated(id);
  }

  get fleenVideo(): FleenVideoView {
    return this.entryView.fleenVideo;
  }
}
