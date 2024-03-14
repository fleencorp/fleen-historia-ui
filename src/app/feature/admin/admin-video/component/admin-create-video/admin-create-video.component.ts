import {Component} from '@angular/core';

import {FormBuilder} from "@angular/forms";
import {Router} from "@angular/router";
import {CreateVideoPayload} from "@app/model/type";
import {Observable} from "rxjs";
import {FleenVideoView} from "@app/model/view/video";
import {BaseCreateVideoComponent} from "@app/base/component/video";
import {AdminVideoService} from "@app/feature/admin/admin-video/service";

@Component({
  selector: 'app-admin-create-video',
  templateUrl: './admin-create-video.component.html',
  styleUrls: ['./admin-create-video.component.css']
})
export class AdminCreateVideoComponent extends BaseCreateVideoComponent {

  public constructor(
      protected adminVideoService: AdminVideoService,
      formBuilder: FormBuilder,
      router: Router) {
    super(adminVideoService, formBuilder, router);
  }

  protected override $saveEntry(payload: CreateVideoPayload): Observable<FleenVideoView> {
    return this.adminVideoService.createVideo(payload);
  }

}
