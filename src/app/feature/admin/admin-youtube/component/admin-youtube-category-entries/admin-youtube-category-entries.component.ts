import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {AnyObject, DeleteIdsPayload} from "@app/model/type";
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from "@angular/common";
import {Observable} from "rxjs";
import {ANY_EMPTY} from "@app/constant";
import {AdminYoutubeService} from "@app/feature/admin/admin-youtube/service";
import {YouTubeCategoryResponse, YouTubeChannelResponse} from "@app/model/response/youtube";
import {SearchResultView} from "@app/model/view";
import {BaseChannelCategoryChannelComponent} from "@app/base/component/video";

@Component({
  selector: 'app-admin-youtube-category-entries',
  templateUrl: './admin-youtube-category-entries.component.html',
  styleUrls: ['./admin-youtube-category-entries.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AdminYoutubeCategoryEntriesComponent extends BaseChannelCategoryChannelComponent<YouTubeCategoryResponse> implements OnInit {

  public override entries: YouTubeCategoryResponse[] = [];

  public constructor(
      youtubeService: AdminYoutubeService,
      router: Router,
      route: ActivatedRoute,
      location: Location) {
    super(youtubeService, router, route, location);
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

  public override trackByFn(index: number, item: YouTubeCategoryResponse): any {
    return item.categoryDetails.id;
  }

  public updateEntries(externalId: string): void {
    const index: number = this.entries.findIndex((entry: YouTubeCategoryResponse): boolean => entry.categoryDetails.id === externalId);
    if (index !== -1) {
      this.entries[index].isAlreadyExistInSystem = true;
      this.resetEntries();
      this.sortEntries();
    }
  }

}
