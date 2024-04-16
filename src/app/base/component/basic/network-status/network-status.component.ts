import {Component, OnInit} from '@angular/core';
import {NetworkService} from "@app/base/service";
import {faWifi, IconDefinition} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-network-status',
  templateUrl: './network-status.component.html',
  styleUrls: ['./network-status.component.css']
})
export class NetworkStatusComponent implements OnInit {

  public isOnline: boolean = false;

  public constructor(protected readonly networkService: NetworkService) {}

  public ngOnInit(): void {
    this.networkService.monitor.subscribe(isOnline => this.isOnline = isOnline);
  }

  protected readonly faWifi: IconDefinition = faWifi;
}
