import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
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

  @Input('video-id')
  public override videoId!: number | string;

  @Output()
  public finishedLoading: EventEmitter<any> = new EventEmitter<any>();

  public constructor(
      userVideoService: UserVideoService,
      formBuilder: FormBuilder,
      router: Router,
      route: ActivatedRoute) {
    super(userVideoService, formBuilder, router, route);
  }

  public async ngOnInit(): Promise<void> {
    await this.initAndGetEntry(this.videoId);
    this.getDataForCreateVideo();
    this.finishedLoading.emit();
  }

}
