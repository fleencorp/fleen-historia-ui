import {Component} from '@angular/core';
import {BaseUpdateVideoComponent} from "@app/base/component/video";
import {FormBuilder} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AdminVideoService} from "@app/feature/admin/admin-video/service";

@Component({
  selector: 'app-admin-update-video',
  templateUrl: './admin-update-video.component.html',
  styleUrls: ['./admin-update-video.component.css']
})
export class AdminUpdateVideoComponent extends BaseUpdateVideoComponent {

  public constructor(
      adminVideoService: AdminVideoService,
      formBuilder: FormBuilder,
      router: Router,
      route: ActivatedRoute) {
    super(adminVideoService, formBuilder, router, route);
  }

}
