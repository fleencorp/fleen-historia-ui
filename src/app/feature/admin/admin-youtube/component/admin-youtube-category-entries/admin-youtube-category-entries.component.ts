import {AfterViewInit, Component, OnInit} from '@angular/core';
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
  styleUrls: ['./admin-youtube-category-entries.component.css']
})
export class AdminYoutubeCategoryEntriesComponent extends BaseEntriesComponent<YouTubeCategoryResponse> implements OnInit, AfterViewInit {

  public override entries: YouTubeCategoryResponse[] = [];

  public constructor(
      protected youtubeService: AdminYoutubeService,
      router: Router,
      route: ActivatedRoute,
      location: Location) {
    super(router, route, location);
  }

  public ngOnInit(): void {
    this.startComponent();
  }

  ngAfterViewInit() {
    console.log(this.entries);
  }

  override findEntries(params: AnyObject): Observable<SearchResultView<YouTubeCategoryResponse>> {
    return this.youtubeService.findYouTubeCategories();
  }

  override deleteEntries(payload: DeleteIdsPayload): Observable<any> {
    return ANY_EMPTY;
  }

}
