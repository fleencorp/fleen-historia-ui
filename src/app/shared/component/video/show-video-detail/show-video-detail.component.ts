import {Component, Input, ViewEncapsulation} from '@angular/core';
import {FleenVideoView} from "@app/model/view/video";

@Component({
  selector: 'app-show-video-detail',
  templateUrl: './show-video-detail.component.html',
  styleUrls: ['./show-video-detail.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ShowVideoDetailComponent {

  @Input('fleen-video')
  public fleenVideo: FleenVideoView = new FleenVideoView({} as FleenVideoView);
}
