import {Component, OnInit} from '@angular/core';
import {UserVideoService} from "@app/feature/user-video/service";
import {FormBuilder} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {BaseUpdateVideoInfoComponent} from "@app/base/component/video";

@Component({
  selector: 'app-update-video-info',
  templateUrl: './update-video-info.component.html',
  styleUrls: ['./update-video-info.component.css']
})
export class UpdateVideoInfoComponent extends BaseUpdateVideoInfoComponent implements OnInit {

  public constructor(
      userVideoService: UserVideoService,
      formBuilder: FormBuilder,
      router: Router,
      route: ActivatedRoute) {
    super(userVideoService, formBuilder, router, route);
  }

}
