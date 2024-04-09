import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {ANY_EMPTY} from "@app/constant";
import {ObjectService, SignedUrlService} from "@app/shared/service/impl";
import {UserVideoService} from "@app/feature/user-video/service";
import {BaseUpdateVideoObjectComponent} from "@app/base/component/video";
import {UploadFileComponent} from "@app/shared/component";
import {isTruthy, nonNull, propExists} from "@app/shared/helper";
import {AnyObject} from "@app/model/type";

@Component({
  selector: 'app-update-video-object',
  templateUrl: './update-video-object.component.html',
  styleUrls: ['./update-video-object.component.css']
})
export class UpdateVideoObjectComponent extends BaseUpdateVideoObjectComponent implements OnInit {

  @Input('video-id')
  public override videoId!: number | string;

  @ViewChild('videoThumbnailComponent') public override videoThumbnailComponent!: UploadFileComponent;
  @ViewChild('videoContentComponent') public override videoContentComponent!: UploadFileComponent;

  public constructor(
      userVideoService: UserVideoService,
      signedUrlService: SignedUrlService,
      objectService: ObjectService) {
    super(userVideoService, signedUrlService, objectService);
  }

  protected override getRouter(): Router {
    return ANY_EMPTY;
  }

  public ngOnInit(): void {
    this.enableLoading();
    if (isTruthy(this.videoId)) {
      this.initEntry();
    }
  }

  public handleUploadedThumbnail(details: AnyObject): void {
    if (nonNull(details) && propExists(details, 'objectOrThumbnailUrl')) {
      this.videoThumbnailUrl = details['objectOrThumbnailUrl'];
    }
  }

  public handleUploadedVideoContent(details: AnyObject): void {
    if (nonNull(details) && propExists(details, 'objectOrVideoUrl')) {
      this.videoContentUrl = details['objectOrVideoUrl'];
    }
  }

}
