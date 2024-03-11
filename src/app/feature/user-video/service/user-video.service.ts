import {Injectable} from "@angular/core";
import {map, Observable} from "rxjs";
import {EntityExistsResponse} from "@app/model/response/common";
import {AnyObject, BaseRequest} from "@app/model/type";
import {SearchResultView} from "@app/model/view";
import {FleenVideoView} from "@app/model/view/video";
import {HttpClientService} from "@app/shared/service/impl";
import {mapToSearchResult} from "@app/shared/helper";

@Injectable()
export class UserVideoService {

  private readonly BASE_PATH: string = "user/video";

  constructor(
    private httpService: HttpClientService) { }


  public findUserVideos(params: AnyObject): Observable<SearchResultView<FleenVideoView>> {
    const req: BaseRequest = this.httpService.toRequest([this.BASE_PATH, 'entries'], params);
    return this.httpService.get(req)
      .pipe(
        map(data => mapToSearchResult(FleenVideoView, data))
      );
  }

  public findUserVideo(id: number | string): Observable<FleenVideoView> {
    const req: BaseRequest = this.httpService.toRequest([this.BASE_PATH, 'detail', +id]);
    return this.httpService.getOne(req)
      .pipe(
        map(data => new FleenVideoView(data))
      );
  }
}
