import {Component, OnInit} from '@angular/core';
import {BaseUpdateComponent} from "@app/base/component";
import {FleenVideoView} from "@app/model/view/video";
import {UpdateVideoPayload} from "@app/model/type/video.type";
import {UserVideoService} from "@app/feature/user-video/service";
import {FormBuilder} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {Observable} from "rxjs";
import {enumValid, maxLength, minLength, required} from "@app/shared/validator";
import {VideoVisibility} from "@app/model/enum";

@Component({
  selector: 'app-update-video-info',
  templateUrl: './update-video-info.component.html',
  styleUrls: ['./update-video-info.component.css']
})
export class UpdateVideoInfoComponent extends BaseUpdateComponent<FleenVideoView, UpdateVideoPayload> implements OnInit {

  public override entryView!: FleenVideoView;

  public constructor(
    private userVideoService: UserVideoService,
    protected formBuilder: FormBuilder,
    router: Router,
    route: ActivatedRoute) {
    super(router, route);
  }

  public ngOnInit(): void {
    this.initEntry();
  }

  protected override getServiceEntry(id: number | string): Observable<FleenVideoView> {
    return this.userVideoService.findUserVideo(id);
  }

  protected override $updateEntry(id: string | number, dto: UpdateVideoPayload): Observable<FleenVideoView> {
    return this.userVideoService.updateVideoInfo(id, dto);
  }

  protected override initForm(): void {
    this.fleenForm = this.formBuilder.group({
      title: [this.fleenVideo?.videoTitle, [required, minLength(1), maxLength(255)]],
      description: [this.fleenVideo?.videoDescription, [required, minLength(1), maxLength(3000)]],
      tags: [this.fleenVideo?.videoTags, [required, minLength(1), maxLength(300)]],
      referenceOrSource: [this.fleenVideo?.videoReferenceOrSource, [required, maxLength(255)]],
      visibility: [this.fleenVideo?.videoVisibility, [required, enumValid(VideoVisibility)]],
      channelId: [this.fleenVideo?.channel.channelId, [required,]],
      categoryId: [this.fleenVideo?.category.categoryId, [required]],
      isForKids: [this.fleenVideo?.isForKids, [required]]
    });
    this.formReady();
  }

  get fleenVideo(): FleenVideoView {
    return this.entryView;
  }

}
