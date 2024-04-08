import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormControl} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {UserVideoService} from "@app/feature/user-video/service";
import {BaseUpdateVideoComponent} from "@app/base/component/video";
import {faArrowLeft, faInfo, faVideo, IconDefinition} from "@fortawesome/free-solid-svg-icons";
import {VideoStatus} from "@app/model/enum";

@Component({
  selector: 'app-update-video',
  templateUrl: './update-video.component.html',
  styleUrls: ['./update-video.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class UpdateVideoComponent extends BaseUpdateVideoComponent implements OnInit {

  public constructor(
      userVideoService: UserVideoService,
      formBuilder: FormBuilder,
      router: Router,
      route: ActivatedRoute) {
    super(userVideoService, formBuilder, router, route);
  }

  public async ngOnInit(): Promise<void> {
    this.enableLoading();
    await this.initEntry(this.start.bind(this));
  }

  public isEnabled: FormControl = new FormControl('disabled');

  public moveBackToDraft(): void {
    // You can perform any action here when the switch is toggled
    console.log('Switch is now:', this.isEnabled ? 'enabled' : 'disabled');
  }

  protected readonly faVideo: IconDefinition = faVideo;
  protected readonly faArrowLeft: IconDefinition = faArrowLeft;
  protected readonly faInfo: IconDefinition = faInfo;
  protected readonly VideoStatus = VideoStatus;
}
