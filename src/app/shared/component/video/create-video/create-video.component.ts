import {Component, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core';
import {AbstractControl, FormGroup} from "@angular/forms";
import {ChannelView} from "@app/model/view/channel";
import {CategoryView} from "@app/model/view/category";
import {FleenVideoView} from "@app/model/view/video";

@Component({
  selector: 'app-create-video',
  templateUrl: './create-video.component.html',
  styleUrls: ['./create-video.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CreateVideoComponent {

  @Input('create-video-form') public videoForm!: FormGroup;
  @Input('is-form-completed') public isFormCompleted: boolean = false;
  @Input('is-form-ready') public isFormReady: boolean = false;
  @Input('is-loading') public isLoading: boolean = false;
  @Input('is-submitting') public isSubmitting: boolean = false
  @Input('status-message') public statusMessage: string = '';
  @Input('error-message') public errorMessage: string = '';

  @Input('channels') public channels: ChannelView[] = [];
  @Input('categories') public categories: CategoryView[] = [];
  @Input('entry') public entryView!: FleenVideoView;

  @Output('create-video') createVideo$: EventEmitter<any> = new EventEmitter<any>();

  public createVideo(): void {
    this.createVideo$.emit();
  }

  get fleenForm(): FormGroup {
    return this.videoForm;
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
