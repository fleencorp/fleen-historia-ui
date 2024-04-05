import {Component} from '@angular/core';
import {
  faAsterisk,
  faAt,
  faCamera,
  faLock,
  faPenFancy,
  faPhone,
  IconDefinition
} from "@fortawesome/free-solid-svg-icons";
import {AuthTokenService} from "@app/base/service";

@Component({
  selector: 'app-member-dashboard',
  templateUrl: './member-dashboard.component.html',
  styleUrls: ['./member-dashboard.component.css']
})
export class MemberDashboardComponent {

  public constructor(protected tokenService: AuthTokenService) {}

  get profilePhoto(): string {
    return this.tokenService.getProfilePhoto();
  }

  protected readonly faAsterisk: IconDefinition = faAsterisk;
  protected readonly faPenFancy: IconDefinition = faPenFancy;
  protected readonly faAt: IconDefinition = faAt;
  protected readonly faPhone: IconDefinition = faPhone;
  protected readonly faLock: IconDefinition = faLock;
  protected readonly faCamera: IconDefinition = faCamera;

}
