import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from "@angular/common";
import {removeProperty} from "@app/shared/helper";
import {DeleteResponse} from "@app/model/response/common";
import {DeleteIdsPayload, SearchPayload} from "@app/model/type";
import {Observable} from "rxjs";
import {AdminVideoService} from "@app/feature/admin/admin-video/service";
import {BaseVideosComponent} from "@app/base/component/video";
import {VideoStatus} from "@app/model/enum";
import {VIDEO_STATUS_SEARCH_KEY} from "@app/constant";

@Component({
  selector: 'app-admin-find-videos',
  templateUrl: './admin-find-videos.component.html',
  styleUrls: ['./admin-find-videos.component.css']
})
export class AdminFindVideosComponent extends BaseVideosComponent implements OnInit {

  protected readonly VideoStatus = VideoStatus;

  public constructor(
      protected adminVideoService: AdminVideoService,
      router: Router,
      route: ActivatedRoute,
      location: Location) {
    super(adminVideoService, router, route, location);
  }

  public ngOnInit(): void {
    this.enableLoading();
    this.startComponent(this.setDefaultVideoSearchStatus.bind(this));
  }

  public override deleteEntryMethod(id: number | string): Observable<DeleteResponse> {
    return this.adminVideoService.deleteVideo(id);
  }

  public override deleteEntries(dto: DeleteIdsPayload): Observable<DeleteResponse> {
    return this.adminVideoService.deleteManyVideos(dto);
  }

}
