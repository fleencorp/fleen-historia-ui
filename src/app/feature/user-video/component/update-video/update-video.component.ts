import {Component, OnInit} from '@angular/core';
import {BaseUpdateComponent} from "@app/base/component";
import {FleenVideoView} from "@app/model/view/video";
import {AnyObject} from "@app/model/type";
import {FormBuilder} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {Observable, of} from "rxjs";
import {ANY_EMPTY} from "@app/constant";
import {UserVideoService} from "@app/feature/user-video/service";

@Component({
  selector: 'app-update-video',
  templateUrl: './update-video.component.html',
  styleUrls: ['./update-video.component.css']
})
export class UpdateVideoComponent extends BaseUpdateComponent<FleenVideoView, AnyObject> implements OnInit {

  public override entryView!: FleenVideoView;

  public constructor(
      private userVideoService: UserVideoService,
      protected formBuilder: FormBuilder,
      router: Router,
      route: ActivatedRoute) {
    super(router, route);
  }

  public updateVideoInfo(): void {

  }

  public updateVideoObject(): void {

  }

  public ngOnInit(): void {
    this.initEntry();
  }

  protected override getServiceEntry(id: number | string): Observable<FleenVideoView> {
    return this.userVideoService.findUserVideo(id);
  }

  protected override $updateEntry(id: string | number, dto: AnyObject): Observable<FleenVideoView> {
    return of(ANY_EMPTY);
  }

  protected override initForm(): void {}

}
