import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from "@angular/common";

import {isFalsy, removeProperty} from "@app/shared/helper";
import {ErrorResponse} from "@app/model/response";
import {DeleteResponse} from "@app/model/response/common";
import {DeleteIdsPayload, SearchPayload} from "@app/model/type";
import {Observable} from "rxjs";
import {AdminVideoService} from "@app/feature/admin/admin-video/service";
import {BaseVideosComponent} from "@app/base/component/video";
import {VideoStatus} from "@app/model/enum";

@Component({
  selector: 'app-admin-find-videos',
  templateUrl: './admin-find-videos.component.html',
  styleUrls: ['./admin-find-videos.component.css']
  // styleUrls: ['assets/css/internal-one.css']
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
    this.startComponent(this.setDefaultVideoSearchStatus.bind(this));
  }

  public deleteEntry(id: number | string): void {
    if (isFalsy(this.isSubmitting) && this.fleenForm.valid) {
      this.disableSubmittingAndResetErrorMessage();

      this.adminVideoService.deleteVideo(id)
        .subscribe({
          next: (result: DeleteResponse): void => { this.setStatusMessage(result.message) },
          error: (error: ErrorResponse): void => { this.handleError(error); },
          complete: async (): Promise<void> => { this.enableSubmitting(); }
      });
    }
  }

  public override deleteEntries(dto: DeleteIdsPayload): Observable<DeleteResponse> {
    return this.adminVideoService.deleteManyVideos(dto);
  }

  protected setDefaultVideoSearchStatus(): void {
    this.searchParams = { ...(this.searchParams), status: VideoStatus.IN_REVIEW };
  }

  public setVideoStatusSearchParam(status: VideoStatus): void {
    const currentStatus: VideoStatus = this.searchParams['status'];
    if (currentStatus === status) {
      removeProperty(this.searchParams, 'status');
    } else {
      this.searchParams = { ...(this.searchParams), status };
    }
  }

  public override async search(payload: SearchPayload): Promise<void> {
    payload['status'] = this.currentVideoSearchStatus;
    await super.search(payload);
  }

  get currentVideoSearchStatus(): VideoStatus {
    return this.searchParams['status'];
  }

}
