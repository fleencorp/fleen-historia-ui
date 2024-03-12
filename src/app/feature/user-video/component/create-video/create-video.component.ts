import {Component, OnInit} from '@angular/core';
import {BaseAddComponent} from "@app/base/component";
import {CreateVideoPayload} from "@app/model/type";
import {FleenVideoView} from "@app/model/view/video";
import {UserVideoService} from "@app/feature/user-video/service";
import {AbstractControl, FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {enumValid, maxLength, minLength, required} from "@app/shared/validator";
import {VideoVisibility} from "@app/model/enum";
import {DEFAULT_FORM_CONTROL_VALUE} from "@app/constant";
import {ChannelView} from "@app/model/view/channel";
import {CategoryView} from "@app/model/view/category";
import {GetCreateVideoResponse} from "@app/model/response/video";
import {ErrorResponse} from "@app/model/response";

@Component({
  selector: 'app-create-video',
  templateUrl: './create-video.component.html',
  styleUrls: ['./create-video.component.css']
})
export class CreateVideoComponent extends BaseAddComponent<CreateVideoPayload, FleenVideoView> implements OnInit {

  public channels: ChannelView[] = [];
  public categories: CategoryView[] = [];

  public constructor(private userVideoService: UserVideoService,
                     formBuilder: FormBuilder,
                     router: Router) {
    super(router, formBuilder);
  }

  public ngOnInit(): void {
    this.initForm();
    this.getDataForCreateVideo();
  }

  protected override initForm(): void {
    this.fleenForm = this.formBuilder.group({
      title: [DEFAULT_FORM_CONTROL_VALUE, [required, minLength(1), maxLength(255)]],

      description: [DEFAULT_FORM_CONTROL_VALUE, [required, minLength(1), maxLength(3000)]],

      tags: [DEFAULT_FORM_CONTROL_VALUE, [required, minLength(1), maxLength(300)]],

      referenceOrSource: [DEFAULT_FORM_CONTROL_VALUE, [required, maxLength(255)]],

      visibility: [DEFAULT_FORM_CONTROL_VALUE, [required, enumValid(VideoVisibility)]],

      channelId: [DEFAULT_FORM_CONTROL_VALUE, [required,]],

      categoryId: [DEFAULT_FORM_CONTROL_VALUE, [required]],

      isForKids: [DEFAULT_FORM_CONTROL_VALUE, [required]]
    });
  }

  private getDataForCreateVideo(): void {
    this.userVideoService.getDataForCreateVideo()
      .subscribe({
        next: (result: GetCreateVideoResponse): void => {
          this.initDataForCreateVideo(result);
          this.formReady();
        },
        error: (error: ErrorResponse): void => { this.handleError(error); }
    });
  }

  private initDataForCreateVideo(result: GetCreateVideoResponse): void {
    this.channels = result.channels;
    this.categories = result.categories;
  }

  public createVideo(): void {
    this.saveEntry();
  }

  protected override $saveEntry(payload: CreateVideoPayload): Observable<FleenVideoView> {
    return this.userVideoService.createVideo(payload);
  }

  get createVideoForm(): FormGroup {
    return this.fleenForm;
  }

  get title(): AbstractControl | null | undefined {
    return this.fleenForm?.get('title');
  }

  get description(): AbstractControl | null | undefined {
    return this.fleenForm?.get('description');
  }

  get tags(): AbstractControl | null | undefined {
    return this.fleenForm?.get('tags');
  }

  get referenceOrSource(): AbstractControl | null | undefined {
    return this.fleenForm?.get('referenceOrSource');
  }

  get visibility(): AbstractControl | null | undefined {
    return this.fleenForm?.get('visibility');
  }

  get channelId(): AbstractControl | null | undefined {
    return this.fleenForm?.get('channelId');
  }

  get categoryId(): AbstractControl | null | undefined {
    return this.fleenForm?.get('categoryId');
  }

  get isForKids(): AbstractControl | null | undefined {
    return this.fleenForm?.get('isForKids');
  }
}
