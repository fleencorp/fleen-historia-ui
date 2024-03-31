import { Component } from '@angular/core';
import {
  faAsterisk,
  faAt,
  faCamera,
  faList,
  faLock,
  faPenFancy,
  faPhone,
  IconDefinition
} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-member-dashboard',
  templateUrl: './member-dashboard.component.html',
  styleUrls: ['./member-dashboard.component.css']
})
export class MemberDashboardComponent {

  protected readonly faAsterisk: IconDefinition = faAsterisk;
  protected readonly faPenFancy: IconDefinition = faPenFancy;
  protected readonly faAt: IconDefinition = faAt;
  protected readonly faPhone: IconDefinition = faPhone;
  protected readonly faLock: IconDefinition = faLock;
  protected readonly faCamera: IconDefinition = faCamera;

}
