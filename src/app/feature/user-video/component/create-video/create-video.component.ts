import {Component, OnInit} from '@angular/core';
import {CreateVideoPayload} from "@app/model/type";
import {FleenVideoView} from "@app/model/view/video";
import {UserVideoService} from "@app/feature/user-video/service";
import {FormBuilder} from "@angular/forms";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {BaseCreateVideoComponent} from "@app/base/component/video";

@Component({
  selector: 'app-create-video',
  templateUrl: './create-video.component.html',
  styleUrls: ['./create-video.component.css']
})
export class CreateVideoComponent extends BaseCreateVideoComponent implements OnInit {

  public constructor(
      protected userVideoService: UserVideoService,
      formBuilder: FormBuilder,
      router: Router) {
    super(userVideoService, formBuilder, router);
  }

  protected override $saveEntry(payload: CreateVideoPayload): Observable<FleenVideoView> {
    return this.userVideoService.createVideo(payload);
  }

}
