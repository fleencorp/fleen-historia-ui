import {Component, OnInit} from '@angular/core';
import {YouTubeChannelResponse} from "@app/model/response/youtube";
import {AdminYoutubeService} from "@app/feature/admin/admin-youtube/service";
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from "@angular/common";
import {AnyObject, DeleteIdsPayload} from "@app/model/type";
import {Observable} from "rxjs";
import {SearchResultView} from "@app/model/view";
import {ANY_EMPTY} from "@app/constant";
import {BaseChannelCategoryChannelComponent} from "@app/base/component/video";

@Component({
  selector: 'app-admin-youtube-channel-entries',
  templateUrl: './admin-youtube-channel-entries.component.html',
  styleUrls: ['./admin-youtube-channel-entries.component.css']
})
export class AdminYoutubeChannelEntriesComponent extends BaseChannelCategoryChannelComponent<YouTubeChannelResponse> implements OnInit {

  public override entries: YouTubeChannelResponse[] = [];

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

  override findEntries(params: AnyObject): Observable<SearchResultView<YouTubeChannelResponse>> {
    return this.youtubeService.findYouTubeChannels();
  }

  override deleteEntries(payload: DeleteIdsPayload): Observable<any> {
    return ANY_EMPTY;
  }

  public override trackByFn(index: number, item: YouTubeChannelResponse): any {
    return item.channelDetails.id;
  }

  public updateEntries(externalId: string): void {
    const index: number = this.entries.findIndex((entry: YouTubeChannelResponse): boolean => entry.channelDetails.id === externalId);
    if (index !== -1) {
      this.entries[index].isAlreadyExistInSystem = true;
      this.resetEntries();
      this.sortEntries();
    }
  }

}
