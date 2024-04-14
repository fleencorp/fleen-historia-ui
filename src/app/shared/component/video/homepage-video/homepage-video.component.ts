import {Component, OnInit} from '@angular/core';
import {BaseVideoComponent} from "@app/base/component/video";
import {FormBuilder} from "@angular/forms";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {Observable} from "rxjs";
import {FleenVideoView} from "@app/model/view/video";
import {UserVideoService} from "@app/feature/user-video/service";

@Component({
  selector: 'app-homepage-video',
  templateUrl: './homepage-video.component.html',
  styleUrls: ['./homepage-video.component.css']
})
export class HomepageVideoComponent extends BaseVideoComponent implements OnInit {

  public constructor(protected userVideoService: UserVideoService,
                     formBuilder: FormBuilder,
                     router: Router,
                     route: ActivatedRoute) {
    super(userVideoService, router, route);
  }

  public async ngOnInit(): Promise<void> {
    this.enableLoading();
    await this.initEntry();
    this.getVideoReviewHistory();
    this.getVideoDiscussion();
  }

  protected override getServiceEntry(id: number | string): Observable<FleenVideoView> {
    return this.userVideoService.findHomepageVideo(id);
  }
}
