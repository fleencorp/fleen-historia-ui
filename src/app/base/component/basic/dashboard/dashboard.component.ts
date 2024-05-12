import {Component} from '@angular/core';
import {AuthTokenService} from "@app/base/service";
import {
  faBars,
  faCamera,
  faList,
  faPlay,
  faShield,
  faUser,
  faVideo,
  faVideoCamera,
  IconDefinition
} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  public constructor(protected tokenService: AuthTokenService) {}

  get profilePhoto(): string {
    return this.tokenService.getProfilePhoto();
  }

  get isAdmin(): boolean {
    return this.tokenService.isAdmin();
  }

  protected readonly faUser: IconDefinition = faUser;
  protected readonly faShield: IconDefinition = faShield;
  protected readonly faVideo: IconDefinition = faVideo;
  protected readonly faBars: IconDefinition = faBars;
  protected readonly faVideoCamera: IconDefinition = faVideoCamera;
  protected readonly faCamera: IconDefinition = faCamera;
  protected readonly faPlay: IconDefinition = faPlay;
  protected readonly faList: IconDefinition = faList;
}
