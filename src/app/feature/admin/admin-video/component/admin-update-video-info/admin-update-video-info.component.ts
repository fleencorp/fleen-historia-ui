import {Component, OnInit} from '@angular/core';
import {BaseUpdateVideoInfoComponent} from "@app/base/component/video";
import {FormBuilder} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AdminVideoService} from "@app/feature/admin/admin-video/service";

@Component({
  selector: 'app-admin-update-video-info',
  templateUrl: './admin-update-video-info.component.html',
  styleUrls: ['./admin-update-video-info.component.css']
})
export class AdminUpdateVideoInfoComponent extends BaseUpdateVideoInfoComponent implements OnInit {

  public constructor(
      adminVideoService: AdminVideoService,
      formBuilder: FormBuilder,
      router: Router,
      route: ActivatedRoute) {
    super(adminVideoService, formBuilder, router, route);
  }

}

