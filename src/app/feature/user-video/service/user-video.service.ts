import {Injectable} from "@angular/core";
import {map, ObjectUnsubscribedError, Observable} from "rxjs";
import {
  AnyObject,
  BaseRequest,
  CreateVideoPayload,
  UpdateVideoObjectPayload,
  UpdateVideoPayload
} from "@app/model/type";
import {SearchResultView} from "@app/model/view";
import {FleenVideoView} from "@app/model/view/video";
import {HttpClientService} from "@app/shared/service/impl";
import {mapToSearchResult} from "@app/shared/helper";
import {GetCreateVideoResponse} from "@app/model/response/video/get-create-video.response";
import {RequestForReviewResponse} from "@app/model/response/video/request-for-review.response";

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

  public getDataForCreateVideo(): Observable<GetCreateVideoResponse> {
    const req: BaseRequest = this.httpService.toRequest([this.BASE_PATH, 'get-create-video']);
    return this.httpService.get(req)
      .pipe(
        map(data => new GetCreateVideoResponse(data))
      );
  }

  public createVideo(body: CreateVideoPayload): Observable<FleenVideoView> {
    const req: BaseRequest = this.httpService.toRequest([this.BASE_PATH, 'save'], null, { ...body });
    return this.httpService.post(req)
      .pipe(
        map(data => new FleenVideoView(data))
      );
  }

  public updateVideoInfo(id: number | string, body: UpdateVideoPayload): Observable<FleenVideoView> {
    const req: BaseRequest = this.httpService.toRequest([this.BASE_PATH, 'update', 'info', +id], null, { ...body });
    return this.httpService.update(req)
      .pipe(
        map(data => new FleenVideoView(data))
      );
  }

  public updateVideoObject(id: number | string, body: UpdateVideoObjectPayload): Observable<FleenVideoView> {
    const req: BaseRequest = this.httpService.toRequest([this.BASE_PATH, 'update', 'object', +id], null, { ...body });
    return this.httpService.update(req)
      .pipe(
        map(data => new FleenVideoView(data))
      );
  }

  public requestForReview(videoId: number | string): Observable<RequestForReviewResponse> {
    const req: BaseRequest = this.httpService.toRequest([this.BASE_PATH, 'request-review', +videoId]);
    return this.httpService.update(req)
      .pipe(
        map(data => new RequestForReviewResponse(data))
      );
  }

  public publishVideo(id: number | string): Observable<FleenVideoView> {
    const req: BaseRequest = this.httpService.toRequest([this.BASE_PATH, 'publish', +id]);
    return this.httpService.update(req)
      .pipe(
        map(data => new FleenVideoView(data))
      );
  }
}
