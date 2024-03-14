import {Component} from '@angular/core';
import {BaseUpdateVideoObjectComponent} from "@app/base/component/video";
import {ObjectService, SignedUrlService} from "@app/shared/service/impl";
import {Router} from "@angular/router";
import {ANY_EMPTY} from "@app/constant";
import {AdminVideoService} from "@app/feature/admin/admin-video/service";

@Component({
  selector: 'app-admin-update-video-object',
  templateUrl: './admin-update-video-object.component.html',
  styleUrls: ['./admin-update-video-object.component.css']
})
export class AdminUpdateVideoObjectComponent extends BaseUpdateVideoObjectComponent {

  public constructor(
      adminVideoService: AdminVideoService,
      signedUrlService: SignedUrlService,
      objectService: ObjectService) {
    super(adminVideoService, signedUrlService, objectService);
  }

  protected override getRouter(): Router {
    return ANY_EMPTY;
  }

}
