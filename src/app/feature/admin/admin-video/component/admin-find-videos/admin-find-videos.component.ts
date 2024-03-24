import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from "@angular/common";

import {isFalsy} from "@app/shared/helper";
import {ErrorResponse} from "@app/model/response";
import {DeleteResponse} from "@app/model/response/common";
import {DeleteIdsPayload} from "@app/model/type";
import {Observable} from "rxjs";
import {AdminVideoService} from "@app/feature/admin/admin-video/service";
import {BaseVideosComponent} from "@app/base/component/video";

@Component({
  selector: 'app-admin-find-videos',
  templateUrl: './admin-find-videos.component.html',
  // styleUrls: ['./admin-find-videos.component.css']
  styleUrls: ['assets/css/internal-one.css']
})
export class AdminFindVideosComponent extends BaseVideosComponent implements OnInit {

  public constructor(
      protected adminVideoService: AdminVideoService,
      router: Router,
      route: ActivatedRoute,
      location: Location) {
    super(adminVideoService, router, route, location);
  }

  public ngOnInit(): void {
    this.startComponent();
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

}
