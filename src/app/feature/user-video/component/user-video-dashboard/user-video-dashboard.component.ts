import {Component} from '@angular/core';
import {faList, faPlus, IconDefinition} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-user-video-dashboard',
  templateUrl: './user-video-dashboard.component.html',
  styleUrls: ['./user-video-dashboard.component.css']
})
export class UserVideoDashboardComponent {

  protected readonly faList: IconDefinition = faList;
  protected readonly faPlus: IconDefinition = faPlus;
}
