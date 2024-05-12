import {Component} from '@angular/core';
import {AuthTokenService} from "@app/base/service";
import {faList, IconDefinition} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-admin-member-dashboard',
  templateUrl: './admin-member-dashboard.component.html',
  styleUrl: './admin-member-dashboard.component.css'
})
export class AdminMemberDashboardComponent {

  public constructor(protected tokenService: AuthTokenService) {}

  get profilePhoto(): string {
    return this.tokenService.getProfilePhoto();
  }

  protected readonly faList: IconDefinition = faList;
}
