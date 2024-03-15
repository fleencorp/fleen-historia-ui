import {Component, OnInit} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {UserVideoService} from "@app/feature/user-video/service";
import {BaseUpdateVideoComponent} from "@app/base/component/video";

@Component({
  selector: 'app-update-video',
  templateUrl: './update-video.component.html',
  styleUrls: ['./update-video.component.css']
})
export class UpdateVideoComponent extends BaseUpdateVideoComponent implements OnInit {

  public constructor(
      userVideoService: UserVideoService,
      formBuilder: FormBuilder,
      router: Router,
      route: ActivatedRoute) {
    super(userVideoService, formBuilder, router, route);
  }

}
