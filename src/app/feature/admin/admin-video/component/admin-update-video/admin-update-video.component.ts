import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {BaseUpdateVideoComponent} from "@app/base/component/video";
import {AbstractControl, FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AdminVideoService} from "@app/feature/admin/admin-video/service";
import {enumValid, required} from "@app/shared/validator";
import {VideoVisibility} from "@app/model/enum";
import {isFalsy} from "@app/shared/helper";
import {ErrorResponse} from "@app/model/response";
import {faArrowLeft, faCircleInfo, faVideo, IconDefinition} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-admin-update-video',
  templateUrl: './admin-update-video.component.html',
  styleUrls: ['./admin-update-video.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AdminUpdateVideoComponent extends BaseUpdateVideoComponent implements OnInit {

  protected readonly faInfo: IconDefinition = faCircleInfo;
  protected readonly faVideo: IconDefinition = faVideo;
  protected readonly faArrowLeft: IconDefinition = faArrowLeft;

  @Input('entry-id')
  public override entryId: number | string = 0;

  public constructor(
      protected adminVideoService: AdminVideoService,
      formBuilder: FormBuilder,
      router: Router,
      route: ActivatedRoute) {
    super(adminVideoService, formBuilder, router, route);
  }

  public async ngOnInit(): Promise<void> {
    this.enableLoading();
    await this.initEntry(this.start.bind(this));
  }

  public override start(): void {
    super.start();
    this.fleenForm = this.formBuilder.group({
      visibility: new FormControl(this.entryView.videoVisibility, [required, enumValid(VideoVisibility)])
    });
    this.formReady();
  }

  public updateVisibility(): void {
    if (isFalsy(this.isSubmitting) && this.fleenForm.valid) {
      this.disableSubmittingAndResetErrorMessage();

      this.adminVideoService.updateVideoVisibility(this.entryId, this.fleenForm.value)
        .subscribe({
          next: (): void => { this.formCompleted(); },
          error: (error: ErrorResponse): void => { this.handleError(error); },
          complete: async (): Promise<void> => { this.enableSubmitting(); }
      });
    }
  }

  get visibility(): AbstractControl | null | undefined {
    return this.fleenForm?.get('visibility');
  }

  get updateVideoVisibilityForm(): FormGroup {
    return this.fleenForm;
  }
}
