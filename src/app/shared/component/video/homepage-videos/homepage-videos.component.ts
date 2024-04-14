import {Component, OnInit} from '@angular/core';
import {BaseVideosComponent} from "@app/base/component/video";
import {UserVideoService} from "@app/feature/user-video/service";
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from "@angular/common";
import {AnyObject, SearchFilter, SearchPayload} from "@app/model/type";
import {Observable} from "rxjs";
import {SearchResultView} from "@app/model/view";
import {FleenVideoView} from "@app/model/view/video";
import {faVideoCamera, IconDefinition} from "@fortawesome/free-solid-svg-icons";
import {VIDEO_QUERY_SEARCH_KEY, VIDEO_TITLE_SEARCH_KEY} from "@app/constant";
import {isTruthy, removeProperty} from "@app/shared/helper";

@Component({
  selector: 'app-homepage-videos',
  templateUrl: './homepage-videos.component.html',
  styleUrls: ['./homepage-videos.component.css']
})
export class HomepageVideosComponent extends BaseVideosComponent implements OnInit {

  public override searchFilter: SearchFilter[] = [];

  public constructor(
      protected userVideoService: UserVideoService,
      router: Router,
      route: ActivatedRoute,
      location: Location) {
    super(userVideoService, router, route, location);
  }

  public ngOnInit(): void {
    this.enableLoading();
    this.startComponent();
  }

  public override findEntries(params: AnyObject): Observable<SearchResultView<FleenVideoView>> {
    return this.userVideoService.findHomepageVideos(params);
  }

  public override async viewDetail(id: number | string | undefined): Promise<void> {
    let destinationRoute: any[] = ['video', id];

    if (this.getRouter().url === '/videos') {
      destinationRoute = ['..', 'video', id];
    }
    if (isTruthy(id)) {
      await this.router.navigate(destinationRoute, {relativeTo: this.route});
    }
  }

  public async viewDetailII(id: number | string | undefined): Promise<void> {
    // if (this.getRouter().url === '' || this.getRouter().url !== '/')
    console.log('The url is ', this.getRouter().url);
    console.log(this.getRouter().lastSuccessfulNavigation);
    this.route.url.subscribe({
      next: (result: any): void => {
        console.log(result);
    }
    })
    await this.router.navigate(['video', id], {relativeTo: this.route});
  }

  public override async search(payload: SearchPayload): Promise<void> {
    this.createTitleSearch(payload);
    removeProperty(payload, VIDEO_QUERY_SEARCH_KEY);
    await super.search(payload, false);
  }

  public createTitleSearch(payload: SearchPayload): void {
    payload[VIDEO_TITLE_SEARCH_KEY] = payload[VIDEO_QUERY_SEARCH_KEY];
  }

  protected readonly faVideoCamera: IconDefinition = faVideoCamera;
}
