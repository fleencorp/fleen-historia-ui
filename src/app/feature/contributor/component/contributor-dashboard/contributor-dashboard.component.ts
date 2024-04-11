import {Component} from '@angular/core';
import {faList, faTimeline, IconDefinition} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-contributor-dashboard',
  templateUrl: './contributor-dashboard.component.html',
  styleUrls: ['./contributor-dashboard.component.css']
})
export class ContributorDashboardComponent {

  protected readonly faList: IconDefinition = faList;
  protected readonly faTimeline: IconDefinition = faTimeline;
}
