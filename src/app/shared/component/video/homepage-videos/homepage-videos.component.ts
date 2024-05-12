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
import {QUERY_SEARCH_KEY, VIDEO_TITLE_SEARCH_KEY} from "@app/constant";
import {isTruthy} from "@app/shared/helper";

@Component({
  selector: 'app-homepage-videos',
  templateUrl: './homepage-videos.component.html'
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
    if (isTruthy(id)) {
      await this.router.navigate(this.getDestinationRoute(id), { relativeTo: this.route });
    }
  }

  /**
   * Generates the destination route based on the provided id and current router state.
   *
   * @param id - The identifier for the destination.
   * @returns An array representing the destination route.
   */
  private getDestinationRoute(id: number | string | undefined): any[] {
    // Default destination route starts with 'video' followed by the id
    let destinationRoute: any[] = ['video', id];

    // Check if the current router URL is '/videos'
    if (this.getRouter().url === '/videos') {
      // If so, prepend '..' to go up one level in the route hierarchy
      destinationRoute = ['..', ...destinationRoute];
    }

    // Return the generated destination route
    return destinationRoute;
  }


  /**
   * Overrides the search method to perform a title search.
   *
   * @param payload - The payload containing search parameters.
   * @returns A Promise that resolves when the search operation completes.
   */
  public override async search(payload: SearchPayload): Promise<void> {
    // Create a title search based on the provided payload
    this.addTitleToSearchQuery(payload);

    // Remove the query search key from the payload
    this.deleteKeyIfExists(payload, QUERY_SEARCH_KEY);

    // Call the base class search method asynchronously, passing false to indicate not to force refresh
    await super.search(payload, false);
  }

  /**
   * Creates a title search by assigning the value of the query search key to the video title search key.
   *
   * @param payload - The payload containing search parameters.
   */
  public addTitleToSearchQuery(payload: SearchPayload): void {
    // Assign the value of the video query search key to the video title search key
    payload[VIDEO_TITLE_SEARCH_KEY] = payload[QUERY_SEARCH_KEY];
  }


  protected readonly faVideoCamera: IconDefinition = faVideoCamera;
}
