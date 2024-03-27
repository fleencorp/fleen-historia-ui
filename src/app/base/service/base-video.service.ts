import {HttpClientService} from "@app/shared/service/impl";
import {
  AnyObject,
  BaseRequest,
  CreateVideoPayload,
  UpdateVideoObjectPayload,
  UpdateVideoPayload
} from "@app/model/type";
import {Observable} from "rxjs";
import {SearchResultView} from "@app/model/view";
import {FleenVideoView} from "@app/model/view/video";
import {GetCreateVideoResponse, PublishVideoResponse, RequestForReviewResponse} from "@app/model/response/video";
import {toSearchResult} from "@app/shared/rxjs";
import {FleenVideoResponse} from "@app/model/response/video/fleen-video.response";

export abstract class BaseVideoService {

  protected abstract readonly BASE_PATH: string;

  protected constructor(
    protected httpService: HttpClientService) { }

  public findVideos(params: AnyObject): Observable<SearchResultView<FleenVideoView>> {
    const req: BaseRequest = this.httpService.toRequest([this.BASE_PATH, 'entries'], params);
    return this.httpService.get(req)
      .pipe(
        toSearchResult(FleenVideoView),
      );
  }

  public findVideo(id: number | string): Observable<FleenVideoResponse> {
    const req: BaseRequest = this.httpService.toRequest([this.BASE_PATH, 'detail', +id]);
    return this.httpService.getOne(req, FleenVideoResponse);
  }

  public createVideo(body: CreateVideoPayload): Observable<FleenVideoView> {
    const req: BaseRequest = this.httpService.toRequest([this.BASE_PATH, 'save'], null, { ...body });
    return this.httpService.post(req, FleenVideoView)
  }

  public getDataForCreateVideo(): Observable<GetCreateVideoResponse> {
    const req: BaseRequest = this.httpService.toRequest([this.BASE_PATH, 'get-create-video']);
    return this.httpService.get(req, GetCreateVideoResponse);
  }

  public updateVideoInfo(id: number | string, body: UpdateVideoPayload): Observable<FleenVideoView> {
    const req: BaseRequest = this.httpService.toRequest([this.BASE_PATH, 'update', 'info', +id], null, { ...body });
    return this.httpService.update(req, FleenVideoView);
  }

  public updateVideoObject(id: number | string, body: UpdateVideoObjectPayload): Observable<FleenVideoView> {
    const req: BaseRequest = this.httpService.toRequest([this.BASE_PATH, 'update', 'object', +id], null, { ...body });
    return this.httpService.update(req, FleenVideoView);
  }

  public requestForReview(videoId: number | string): Observable<RequestForReviewResponse> {
    const req: BaseRequest = this.httpService.toRequest([this.BASE_PATH, 'request-review', +videoId]);
    return this.httpService.update(req, RequestForReviewResponse);
  }

  public publishVideo(id: number | string): Observable<PublishVideoResponse> {
    const req: BaseRequest = this.httpService.toRequest([this.BASE_PATH, 'publish', +id]);
    return this.httpService.update(req, PublishVideoResponse);
  }

}
