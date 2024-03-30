import {Component, OnInit} from '@angular/core';
import {
  faArrowRight,
  faBars,
  faCircleInfo,
  faDashboard,
  faHome,
  faPlus,
  faSignIn,
  faSignOut,
  faUser,
  faVideo,
  IconDefinition
} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  protected readonly faInfo: IconDefinition = faCircleInfo;

  constructor() { }

  ngOnInit(): void {
  }

  protected readonly faArrowRight: IconDefinition = faArrowRight;
  protected readonly faHome: IconDefinition = faHome;
  protected readonly faUser: IconDefinition = faUser;
  protected readonly faVideo: IconDefinition = faVideo;
  protected readonly faDashboard: IconDefinition = faDashboard;
  protected readonly faSignOut: IconDefinition = faSignOut;
  protected readonly faSignIn: IconDefinition = faSignIn;
  protected readonly faPlus: IconDefinition = faPlus;
  protected readonly faBars: IconDefinition = faBars;
}
