import {Component, OnInit} from '@angular/core';
import {CreateVideoPayload} from "@app/model/type";
import {FleenVideoShortView, FleenVideoView} from "@app/model/view/video";
import {UserVideoService} from "@app/feature/user-video/service";
import {FormBuilder, FormControl} from "@angular/forms";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {BaseCreateVideoComponent} from "@app/base/component/video";
import {isTruthy} from "@app/shared/helper";
import {SearchResultView} from "@app/model/view";
import {ErrorResponse} from "@app/model/response";
import {
  faArrowLeft,
  faFaceSmile,
  faFire,
  faPlus,
  faSearch,
  faSpinner,
  IconDefinition
} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'user-app-create-video',
  templateUrl: './user-create-video.component.html',
  styleUrls: ['./user-create-video.component.css']
})
export class UserCreateVideoComponent extends BaseCreateVideoComponent implements OnInit {

  public entries: FleenVideoShortView[] = [];
  public queryControl: FormControl<string | null> = new FormControl<string>('');
  public isCreateVideoStage: boolean = false;

  public constructor(
    protected userVideoService: UserVideoService,
    formBuilder: FormBuilder,
    router: Router) {
    super(userVideoService, formBuilder, router);
  }

  public ngOnInit(): void {
    this.enableLoading();
    this.initForm();
    this.getDataForCreateVideo();
  }

  protected override $saveEntry(payload: CreateVideoPayload): Observable<FleenVideoView> {
    return this.userVideoService.createVideo(payload);
  }

  public searchVideos(): void {
    if (isTruthy(this.query)) {
      this.enableSearchInProgress();
      this.userVideoService.findVideosAndSnippets(this.query)
        .subscribe({
          next: (result: SearchResultView<FleenVideoShortView>): void => {
            this.entries = result.values;
          },
          error: (error: ErrorResponse): void => {
            this.handleError(error);
            this.disableSearchInProgress();
          },
          complete: (): void => { this.disableSearchInProgress(); }
      });
    }
  }

  public proceedToCreateVideo(): void {
    this.isCreateVideoStage = true;
  }

  public goBack(): void {
    this.isCreateVideoStage = false;
    this.isVideoCreated = false;
  }

  get query(): string {
    if (isTruthy(this.queryControl.value)) {
      return this.queryControl.value as string;
    }
    return "";
  }

  protected readonly faSpinner: IconDefinition = faSpinner;
  protected readonly faSearch: IconDefinition = faSearch;
  protected readonly faPlus: IconDefinition = faPlus;
  protected readonly faArrowLeft: IconDefinition = faArrowLeft;
  protected readonly faFaceSmile: IconDefinition = faFaceSmile;
  protected readonly faFire = faFire;
}
