import {Component, Input, ViewChild} from '@angular/core';
import {BaseUpdateVideoObjectComponent} from "@app/base/component/video";
import {ObjectService, SignedUrlService} from "@app/shared/service/impl";
import {Router} from "@angular/router";
import {ANY_EMPTY} from "@app/constant";
import {AdminVideoService} from "@app/feature/admin/admin-video/service";
import {UploadFileComponent} from "@app/shared/component";
import {isTruthy} from "@app/shared/helper";
import {faArrowLeft, IconDefinition} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-admin-update-video-object',
  templateUrl: './admin-update-video-object.component.html',
  styleUrls: ['./admin-update-video-object.component.css']
})
export class AdminUpdateVideoObjectComponent extends BaseUpdateVideoObjectComponent {

  protected readonly faArrowLeft: IconDefinition = faArrowLeft;

  @Input('video-id')
  public override videoId!: number | string;

  @ViewChild('videoThumbnailComponent') public override videoThumbnailComponent!: UploadFileComponent;
  @ViewChild('videoContentComponent') public override videoContentComponent!: UploadFileComponent;

  public constructor(
      adminVideoService: AdminVideoService,
      signedUrlService: SignedUrlService,
      objectService: ObjectService) {
    super(adminVideoService, signedUrlService, objectService);
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

}
