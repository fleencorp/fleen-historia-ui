import {Component, OnInit} from '@angular/core';
import {BaseEntriesComponent} from "@app/base/component";

@Component({
  selector: 'app-user-videos',
  templateUrl: './user-videos.component.html',
  styleUrls: ['./user-videos.component.css']
})
export class UserVideosComponent extends BaseEntriesComponent<CountryView> implements OnInit {

}
