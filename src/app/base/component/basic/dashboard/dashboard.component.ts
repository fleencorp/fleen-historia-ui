import {Component} from '@angular/core';
import {AuthTokenService} from "@app/base/service";
import {faBars, faShield, faUser, faVideo, IconDefinition} from "@fortawesome/free-solid-svg-icons";

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

  protected readonly faUser: IconDefinition = faUser;
  protected readonly faShield: IconDefinition = faShield;
  protected readonly faVideo: IconDefinition = faVideo;
  protected readonly faBars: IconDefinition = faBars;
}
