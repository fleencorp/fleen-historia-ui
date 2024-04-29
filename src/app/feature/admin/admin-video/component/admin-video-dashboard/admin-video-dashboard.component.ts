import {Component} from '@angular/core';
import {faList, faTrash, IconDefinition} from "@fortawesome/free-solid-svg-icons";
import {AuthTokenService} from "@app/base/service";

@Component({
  selector: 'app-admin-video-dashboard',
  templateUrl: './admin-video-dashboard.component.html',
  styleUrls: ['./admin-video-dashboard.component.css']
})
export class AdminVideoDashboardComponent {

  public constructor(protected tokenService: AuthTokenService) {}

  get profilePhoto(): string {
    return this.tokenService.getProfilePhoto();
  }

  protected readonly faList: IconDefinition = faList;
  protected readonly faTrash: IconDefinition = faTrash;
}
