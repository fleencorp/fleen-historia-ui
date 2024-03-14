import {Component, OnInit} from '@angular/core';
import {BaseEntriesDeleteAllComponent} from "@app/base/component/common/base-entries-delete-all.component";
import {AdminVideoService} from "@app/feature/admin/admin-video/service/admin-video.service";
import {FormBuilder} from "@angular/forms";
import {Router} from "@angular/router";
import {CountAllResponse, DeleteResponse} from "@app/model/response/common";
import {Observable} from "rxjs";

@Component({
  selector: 'app-admin-delete-all-videos',
  templateUrl: './admin-delete-all-videos.component.html',
  styleUrls: ['./admin-delete-all-videos.component.css']
})
export class AdminDeleteAllVideosComponent extends BaseEntriesDeleteAllComponent implements OnInit {

  public constructor(
      protected adminVideoService: AdminVideoService,
      protected formBuilder: FormBuilder,
      private router: Router) {
    super();
  }

  public ngOnInit(): void {
    this.countAll();
  }

  protected override serviceCountAll(): Observable<CountAllResponse> {
    return this.adminVideoService.countAllVideos();
  }

  protected override serviceDeleteAll(): Observable<DeleteResponse> {
    return this.adminVideoService.deleteAllVideos();
  }

  protected override getRouter(): Router {
    return this.router;
  }

}
