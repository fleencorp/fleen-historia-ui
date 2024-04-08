import {Injectable} from "@angular/core";
import {HttpClientService} from "@app/shared/service/impl";
import {BaseVideoService} from "@app/base/service";
import {Observable} from "rxjs";
import {MoveToDraftResponse, VideoCommentResponse, VideoReviewHistoryResponse} from "@app/model/response/video";
import {ContributorService} from "@app/feature/contributor/service";
import {BaseRequest} from "@app/model/type";

@Injectable()
export class UserVideoService extends BaseVideoService {

  protected override readonly BASE_PATH: string = "user/video";

  constructor(
      protected contributorService: ContributorService,
      httpService: HttpClientService) {
    super(httpService);
  }

  public findVideoReviewHistory(id: number | string): Observable<VideoReviewHistoryResponse> {
    return this.contributorService.findVideoReviewHistory(id);
  }

  public findVideoDiscussion(id: number | string): Observable<VideoCommentResponse> {
    return this.contributorService.findVideoDiscussion(id);
  }

  public moveVideoBackToDraft(id: number | string): Observable<MoveToDraftResponse> {
    const req: BaseRequest = this.httpService.toRequest([this.BASE_PATH, 'update', 'move-to-draft', +id]);
    return this.httpService.update(req, MoveToDraftResponse);
  }

}
