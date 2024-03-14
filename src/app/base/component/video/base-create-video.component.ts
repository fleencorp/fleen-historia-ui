import {BaseAddComponent} from "@app/base/component";
import {CreateVideoPayload} from "@app/model/type";
import {FleenVideoView} from "@app/model/view/video";
import {OnInit} from "@angular/core";
import {ChannelView} from "@app/model/view/channel";
import {CategoryView} from "@app/model/view/category";
import {AbstractControl, FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {DEFAULT_FORM_CONTROL_VALUE} from "@app/constant";
import {enumValid, maxLength, minLength, required} from "@app/shared/validator";
import {VideoVisibility} from "@app/model/enum";
import {GetCreateVideoResponse} from "@app/model/response/video";
import {ErrorResponse} from "@app/model/response";
import {Observable} from "rxjs";
import {BaseVideoService} from "@app/base/service";

export abstract class BaseCreateVideoComponent extends BaseAddComponent<CreateVideoPayload, FleenVideoView> implements OnInit {

  public channels: ChannelView[] = [];
  public categories: CategoryView[] = [];

  protected constructor(
      protected videosService: BaseVideoService,
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
    this.videosService.getDataForCreateVideo()
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
    return this.videosService.createVideo(payload);
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
