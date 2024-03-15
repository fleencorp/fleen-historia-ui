import {BaseUpdateComponent} from "@app/base/component";
import {FleenVideoView} from "@app/model/view/video";
import {UpdateVideoPayload} from "@app/model/type";
import {ChannelView} from "@app/model/view/channel";
import {CategoryView} from "@app/model/view/category";
import {AbstractControl, FormBuilder, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {GetCreateVideoResponse} from "@app/model/response/video";
import {Observable} from "rxjs";
import {enumValid, maxLength, minLength, required} from "@app/shared/validator";
import {VideoVisibility} from "@app/model/enum";
import {BaseVideoService} from "@app/base/service";
import {ErrorResponse} from "@app/model/response";

export abstract class BaseUpdateVideoInfoComponent extends BaseUpdateComponent<FleenVideoView, UpdateVideoPayload> {

  public channels: ChannelView[] = [];
  public categories: CategoryView[] = [];
  public override entryView!: FleenVideoView;

  public videoId!: number | string;

  protected constructor(
      protected videoService: BaseVideoService,
      protected formBuilder: FormBuilder,
      router: Router,
      route: ActivatedRoute) {
    super(router, route);
  }

  protected getDataForCreateVideo(): void {
    this.videoService.getDataForCreateVideo()
      .subscribe({
        next: (result: GetCreateVideoResponse): void => {
          this.initDataForCreateVideo(result);
          this.formReady();
        },
        error: (error: ErrorResponse): void => { this.handleError(error); }
      });
  }

  protected initDataForCreateVideo(result: GetCreateVideoResponse): void {
    this.channels = result.channels;
    this.categories = result.categories;
  }

  protected override getServiceEntry(id: number | string): Observable<FleenVideoView> {
    return this.videoService.findVideo(id);
  }

  protected override $updateEntry(id: string | number, dto: UpdateVideoPayload): Observable<FleenVideoView> {
    return this.videoService.updateVideoInfo(id, dto);
  }

  protected override initForm(): void {
    this.fleenForm = this.formBuilder.group({
      title: [this.fleenVideo?.videoTitle, [required, minLength(1), maxLength(255)]],

      description: [this.fleenVideo?.videoDescription, [required, minLength(1), maxLength(3000)]],

      tags: [this.fleenVideo?.videoTags, [required, minLength(1), maxLength(300)]],

      referenceOrSource: [this.fleenVideo?.videoReferenceOrSource, [required, maxLength(255)]],

      visibility: [this.fleenVideo?.videoVisibility, [required, enumValid(VideoVisibility)]],

      channelId: [this.fleenVideo?.channel.channelId, [required,]],

      categoryId: [this.fleenVideo?.category.categoryId, [required]],

      isForKids: [this.fleenVideo?.isForKids, [required]]
    });

    this.formReady();
  }

  get fleenVideo(): FleenVideoView {
    return this.entryView;
  }

  get updateVideoForm(): FormGroup {
    return this.fleenForm;
  }

  public updateVideo(): void {
    this.updateEntry();
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
