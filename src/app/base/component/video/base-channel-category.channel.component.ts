import {BaseEntriesComponent} from "@app/base/component";
import {YouTubeChannelCategoryResponse} from "@app/model/response/youtube";
import {AdminYoutubeService} from "@app/feature/admin/admin-youtube/service";
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from "@angular/common";
import {DeleteIdsPayload} from "@app/model/type";
import {Observable} from "rxjs";
import {ANY_EMPTY} from "@app/constant";

export abstract class BaseChannelCategoryChannelComponent<T extends YouTubeChannelCategoryResponse> extends BaseEntriesComponent<YouTubeChannelCategoryResponse> {

  public override entries: YouTubeChannelCategoryResponse[] = [];

  protected constructor(
      protected youtubeService: AdminYoutubeService,
      router: Router,
      route: ActivatedRoute,
      location: Location) {
    super(router, route, location);
  }


  override deleteEntries(payload: DeleteIdsPayload): Observable<any> {
    return ANY_EMPTY;
  }

  protected sortEntries(): void {
    this.entries = this.entries.sort((a: YouTubeChannelCategoryResponse, b: YouTubeChannelCategoryResponse): number => {
      if (a.isAlreadyExistInSystem === b.isAlreadyExistInSystem) {
        return 0;
      }
      // If 'a' is not already in the system and 'b' is already in the system, 'a' should come before 'b'
      if (!a.isAlreadyExistInSystem && b.isAlreadyExistInSystem) {
        return -1;
      }
      // If 'a' is already in the system and 'b' is not already in the system, 'b' should come before 'a'
      if (a.isAlreadyExistInSystem && !b.isAlreadyExistInSystem) {
        return 1;
      }
      return 0;
    });
  }

  abstract updateEntries(externalId: string | number): void;

}
