import {Component, OnInit} from '@angular/core';
import {BaseUpdateComponent} from "@app/base/component";
import {FleenVideoView} from "@app/model/view/video";
import {AnyObject} from "@app/model/type";
import {FormBuilder} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {Observable, of} from "rxjs";
import {ANY_EMPTY} from "@app/constant";
import {UserVideoService} from "@app/feature/user-video/service";
import {VideoStatus} from "@app/model/enum";

@Component({
  selector: 'app-update-video',
  templateUrl: './update-video.component.html',
  styleUrls: ['./update-video.component.css']
})
export class UpdateVideoComponent extends BaseUpdateComponent<FleenVideoView, AnyObject> implements OnInit {

  public override entryView!: FleenVideoView;
  public isVideoInReview: boolean = false;
  public isVideoNotApprovedYet: boolean = false;
  public canUpdateObjectOrVideoContent: boolean = false;
  public startUpdateVideoInfo: boolean = false;
  public startUpdateVideoObject: boolean = false;

  public constructor(
      private userVideoService: UserVideoService,
      protected formBuilder: FormBuilder,
      router: Router,
      route: ActivatedRoute) {
    super(router, route);
  }

  public updateVideoInfo(): void {
    this.startUpdateVideoInfo = true;
  }

  public updateVideoObject(): void {
    this.startUpdateVideoObject = true;
  }

  public async ngOnInit(): Promise<void> {
    await this.initEntry(this.start.bind(this));
  }

  protected override getServiceEntry(id: number | string): Observable<FleenVideoView> {
    return this.userVideoService.findUserVideo(id);
  }

  protected override $updateEntry(id: string | number, dto: AnyObject): Observable<FleenVideoView> {
    return of(ANY_EMPTY);
  }

  get canUpdateVideoInfoOrObject(): boolean {
    return !(this.isVideoInReview)
      && !(this.startUpdateVideoInfo)
      && !(this.startUpdateVideoObject);
  }

  protected override initForm(): void {}

  protected start(): void {
    this.checkIsVideoInReview();
    this.checkCanUpdateVideoContent();
    this.checkIsVideoNotApprovedYet();
  }

  protected checkIsVideoInReview(): void {
    if (this.entryView.videoStatus === VideoStatus.IN_REVIEW) {
      this.isVideoInReview = true;
    }
  }

  protected checkIsVideoNotApprovedYet(): void {
    if (this.entryView.videoStatus !== VideoStatus.APPROVED) {
      this.isVideoNotApprovedYet = true;
    }
  }

  protected checkCanUpdateVideoContent(): void {
    if (!(this.entryView.isObjectApproved)) {
      this.canUpdateObjectOrVideoContent = true;
    }
  }
}
