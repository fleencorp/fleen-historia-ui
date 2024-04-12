import {Component, Input, OnInit} from '@angular/core';
import {UserVideoService} from "@app/feature/user-video/service";
import {FormBuilder} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {BaseUpdateVideoInfoComponent} from "@app/base/component/video";

@Component({
  selector: 'app-user-update-video-info',
  templateUrl: './user-update-video-info.component.html',
  styleUrls: ['./user-update-video-info.component.css']
})
export class UserUpdateVideoInfoComponent extends BaseUpdateVideoInfoComponent implements OnInit {

  @Input('video-id')
  public override videoId!: number | string;

  public constructor(
      userVideoService: UserVideoService,
      formBuilder: FormBuilder,
      router: Router,
      route: ActivatedRoute) {
    super(userVideoService, formBuilder, router, route);
  }

  public async ngOnInit(): Promise<void> {
    this.enableLoading();
    await this.initAndGetEntry(this.videoId);
    this.getDataForCreateVideo();
  }

}
