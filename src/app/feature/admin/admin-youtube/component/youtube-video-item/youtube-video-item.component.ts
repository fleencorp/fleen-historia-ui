import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BaseDetailComponent} from "@app/base/component";
import {ActivatedRoute, Router} from "@angular/router";
import {Observable, of} from "rxjs";
import {YoutubeVideoResponse} from "@app/model/response/youtube";
import {AdminYoutubeService} from "@app/feature/admin/admin-youtube/service";
import {ANY_EMPTY} from "@app/constant";
import {isFalsy} from "@app/shared/helper";
import {ErrorResponse} from "@app/model/response";

@Component({
  selector: 'app-youtube-video-item',
  templateUrl: './youtube-video-item.component.html',
  styleUrls: ['./youtube-video-item.component.css']
})
export class YoutubeVideoItemComponent extends BaseDetailComponent<YoutubeVideoResponse> implements OnInit {

  @Input('entry')
  public override entryView!: YoutubeVideoResponse;

  @Output('deleted-video')
  public deleteVideoNotifier: EventEmitter<string> = new EventEmitter<string>();

  protected override formBuilder;

  public constructor(private videoService: AdminYoutubeService,
                     router: Router,
                     route: ActivatedRoute) {
    super(router, route);
  }

  public async ngOnInit(): Promise<void> {
    await this.noOpFunction$();
  }

  protected override getServiceEntry(id: number | string): Observable<YoutubeVideoResponse> {
    return of(ANY_EMPTY);
  }

  public deleteVideo(): void {
    if (isFalsy(this.isSubmitting)) {
      this.disableSubmittingAndResetErrorMessage();

      this.videoService.deleteVideoFromYouTube(this.video.videoId)
        .subscribe({
          next: (): void => { this.deleteVideoNotifier.emit(this.video.videoId); },
          error: (error: ErrorResponse): void => { this.handleError(error); },
          complete: (): void => { this.enableSubmitting(); }
      });
    }
  }

  get video(): YoutubeVideoResponse {
    return this.entryView;
  }

}

