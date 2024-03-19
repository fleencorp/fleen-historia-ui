import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {BaseEntriesComponent} from "@app/base/component";
import {AnyObject, DeleteIdsPayload} from "@app/model/type";
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from "@angular/common";
import {Observable} from "rxjs";
import {ANY_EMPTY} from "@app/constant";
import {AdminYoutubeService} from "@app/feature/admin/admin-youtube/service";
import {YouTubeCategoryResponse} from "@app/model/response/youtube";
import {SearchResultView} from "@app/model/view";

@Component({
  selector: 'app-admin-youtube-category-entries',
  templateUrl: './admin-youtube-category-entries.component.html',
  styleUrls: ['./admin-youtube-category-entries.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AdminYoutubeCategoryEntriesComponent extends BaseEntriesComponent<YouTubeCategoryResponse> implements OnInit {

  public override entries: YouTubeCategoryResponse[] = [];

  public constructor(
      protected youtubeService: AdminYoutubeService,
      router: Router,
      route: ActivatedRoute,
      location: Location) {
    super(router, route, location);
  }

  public ngOnInit(): void {
    this.startComponent(this.sortEntries.bind(this));
  }

  override findEntries(params: AnyObject): Observable<SearchResultView<YouTubeCategoryResponse>> {
    return this.youtubeService.findYouTubeCategories();
  }

  override deleteEntries(payload: DeleteIdsPayload): Observable<any> {
    return ANY_EMPTY;
  }

  private sortEntries(): void {
    this.entries = this.entries.sort((a: YouTubeCategoryResponse, b: YouTubeCategoryResponse): number => {
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

  public override trackByFn(index: number, item: YouTubeCategoryResponse): any {
    return item.categoryDetails.id;
  }

  public updateEntries(categoryExternalId: string): void {
    const index: number = this.entries.findIndex((entry: YouTubeCategoryResponse): boolean => entry.categoryDetails.id === categoryExternalId);
    if (index !== -1) {
      this.entries[index].isAlreadyExistInSystem = true;
      this.resetEntries();
    }
  }

}
