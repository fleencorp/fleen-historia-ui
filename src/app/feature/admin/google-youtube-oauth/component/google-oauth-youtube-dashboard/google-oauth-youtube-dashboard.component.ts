import {Component} from '@angular/core';
import {faList, faPlus} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-google-oauth-youtube-dashboard',
  templateUrl: './google-oauth-youtube-dashboard.component.html',
  styleUrl: './google-oauth-youtube-dashboard.component.css'
})
export class GoogleOauthYoutubeDashboardComponent {

  protected readonly faPlus = faPlus;
  protected readonly faList = faList;
}
