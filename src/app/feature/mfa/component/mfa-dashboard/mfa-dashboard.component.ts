import {Component} from '@angular/core';
import {faShield, faShieldHalved, IconDefinition} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-mfa-dashboard',
  templateUrl: './mfa-dashboard.component.html',
  styleUrls: ['./mfa-dashboard.component.css']
})
export class MfaDashboardComponent {

  protected readonly faShieldHalved: IconDefinition = faShieldHalved;
  protected readonly faShield: IconDefinition = faShield;
}
