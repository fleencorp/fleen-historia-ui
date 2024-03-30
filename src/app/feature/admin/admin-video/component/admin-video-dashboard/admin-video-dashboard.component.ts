import {Component} from '@angular/core';
import {faArrowRight, faList, faTrash, IconDefinition} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-admin-video-dashboard',
  templateUrl: './admin-video-dashboard.component.html',
  styleUrls: ['./admin-video-dashboard.component.css']
})
export class AdminVideoDashboardComponent {

  protected readonly faList: IconDefinition = faList;
  protected readonly faTrash: IconDefinition = faTrash;
}
