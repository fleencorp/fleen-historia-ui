import {Injectable} from "@angular/core";
import {HttpClientService} from "@app/shared/service/impl";
import {BaseVideoService} from "@app/base/service";
import {Observable} from "rxjs";
import {MoveToDraftResponse} from "@app/model/response/video";
import {AnyObject, BaseRequest} from "@app/model/type";
import {SearchResultView} from "@app/model/view";
import {FleenVideoShortView, FleenVideoView} from "@app/model/view/video";
import {toSearchResult} from "@app/shared/rxjs";

@Injectable()
export class UserVideoService extends BaseVideoService {

  protected override readonly BASE_PATH: string = "user/video";
  protected readonly HOMEPAGE_BASE_PATH: string = "homepage";

  constructor(httpService: HttpClientService) {
    super(httpService);
  }

  public findHomepageVideos(params: AnyObject): Observable<SearchResultView<FleenVideoView>> {
    const req: BaseRequest = this.httpService.toRequest([this.HOMEPAGE_BASE_PATH, 'entries', 'videos'], params);
    return this.httpService.get(req)
      .pipe(
        toSearchResult(FleenVideoView),
      );
  }

  public findVideosAndSnippets(q: String): Observable<SearchResultView<FleenVideoShortView>> {
    const req: BaseRequest = this.httpService.toRequest([this.CONTRIBUTOR_BASE_PATH, 'entries', 'videos', 'snippet'], { q });
    return this.httpService.get(req)
      .pipe(
        toSearchResult(FleenVideoShortView),
      );
  }

  public findHomepageVideo(id: number | string): Observable<FleenVideoView> {
    const req: BaseRequest = this.httpService.toRequest([this.HOMEPAGE_BASE_PATH, 'video', 'detail', +id]);
    return this.httpService.get(req, FleenVideoView);
  }

  public moveVideoBackToDraft(id: number | string): Observable<MoveToDraftResponse> {
    const req: BaseRequest = this.httpService.toRequest([this.BASE_PATH, 'update', 'move-to-draft', +id]);
    return this.httpService.update(req, MoveToDraftResponse);
  }

}
