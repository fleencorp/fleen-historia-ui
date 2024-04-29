import {Component} from '@angular/core';
import {faIcons, faKey, faList, faPlus, IconDefinition} from "@fortawesome/free-solid-svg-icons";
import {AuthTokenService} from "@app/base/service";

@Component({
  selector: 'app-admin-youtube-dashboard',
  templateUrl: './admin-youtube-dashboard.component.html',
  styleUrls: ['./admin-youtube-dashboard.component.css']
})
export class AdminYoutubeDashboardComponent {

  public constructor(protected tokenService: AuthTokenService) {}

  get profilePhoto(): string {
    return this.tokenService.getProfilePhoto();
  }

  protected readonly faKey: IconDefinition = faKey;
  protected readonly faPlus: IconDefinition = faPlus;
  protected readonly faIcons: IconDefinition = faIcons;
  protected readonly faList: IconDefinition = faList;
}
