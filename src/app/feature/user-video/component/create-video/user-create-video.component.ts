import {Component, OnInit} from '@angular/core';
import {CreateVideoPayload} from "@app/model/type";
import {FleenVideoView} from "@app/model/view/video";
import {UserVideoService} from "@app/feature/user-video/service";
import {FormBuilder} from "@angular/forms";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {BaseCreateVideoComponent} from "@app/base/component/video";

@Component({
  selector: 'user-app-create-video',
  templateUrl: './user-create-video.component.html',
  styleUrls: ['./user-create-video.component.css']
})
export class UserCreateVideoComponent extends BaseCreateVideoComponent implements OnInit {

  public constructor(
      protected userVideoService: UserVideoService,
      formBuilder: FormBuilder,
      router: Router) {
    super(userVideoService, formBuilder, router);
  }

  public ngOnInit(): void {
    this.enableLoading();
    this.initForm();
    this.getDataForCreateVideo();
  }

  protected override $saveEntry(payload: CreateVideoPayload): Observable<FleenVideoView> {
    return this.userVideoService.createVideo(payload);
  }

}
