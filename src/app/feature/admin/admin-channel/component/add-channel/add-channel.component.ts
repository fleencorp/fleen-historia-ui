import {Component, EventEmitter, Input, Output} from '@angular/core';
import {BaseFormImplComponent} from "@app/base/component";
import {FormControl} from "@angular/forms";
import {maxLength} from "@app/shared/validator";
import {YouTubeChannelResponse} from "@app/model/response/youtube";
import {isFalsy, isTruthy} from "@app/shared/helper";
import {ErrorResponse} from "@app/model/response";
import {AdminChannelService} from "@app/feature/admin/admin-channel/service";
import {CreateChannelPayload} from "@app/model/type/channel.type";
import {faFilm, faSpinner, faVideo, IconDefinition} from "@fortawesome/free-solid-svg-icons";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-channel',
  templateUrl: './add-channel.component.html',
  styleUrls: ['./add-channel.component.css']
})
export class AddChannelComponent extends BaseFormImplComponent {

  public $description: FormControl = new FormControl<string>('', [maxLength(3000)]);
  protected readonly faVideo: IconDefinition = faVideo;
  protected readonly faFilm: IconDefinition = faFilm;
  protected readonly faSpinner: IconDefinition = faSpinner;

  @Input('entry')
  public entry!: YouTubeChannelResponse;

  @Output()
  public addedChannel: EventEmitter<string> = new EventEmitter<string>();

  public constructor(
      protected channelService: AdminChannelService,
      protected router: Router) {
    super();
  }

  public ngOnInit(): void {
    this.formReady();
  }

  protected override getRouter(): Router {
    return this.router;
  }

  public addChannel(): void {
    if (isFalsy(this.isSubmitting)) {
      this.disableSubmittingAndResetErrorMessage();

      this.channelService.addChannel(this.getAddCategoryPayload())
        .subscribe({
          next: (): void => { this.formCompleted(this.notifyNewAddedChannel.bind(this)); },
          error: (error: ErrorResponse): void => { this.handleError(error); },
          complete: async (): Promise<void> => { this.enableSubmitting(); }
      });
    }
  }

  public viewChannelVideos(channelId: string | number): void {
    if (isTruthy(channelId)) {
      this.navigateTo(['admin-youtube', 'channel', channelId.toString(), 'videos']);
    }
  }

  private getAddCategoryPayload(): CreateChannelPayload {
    return  {
      title: this.entry.channelDetails.snippet.title,
      channelExternalId: this.entry.channelDetails.id
    }
  }

  public notifyNewAddedChannel(): void {
    this.addedChannel.emit(this.entry.channelDetails.id);
  }

  get description(): string {
    return this.$description.value;
  }
}
