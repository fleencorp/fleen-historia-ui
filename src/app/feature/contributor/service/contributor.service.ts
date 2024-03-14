import {Injectable} from '@angular/core';
import {HttpClientService} from "@app/shared/service/impl";
import {AnyObject, BaseRequest, SubmitVideoReviewPayload} from "@app/model/type";
import {map, Observable} from "rxjs";
import {SearchResultView} from "@app/model/view";
import {FleenVideoView, VideoReviewView} from "@app/model/view/video";
import {mapToSearchResult} from "@app/shared/helper";
import {UserCanSubmitReviewResponse, VideoReviewHistoryResponse} from "@app/model/response/video";

@Injectable()
export class ContributorService {

  private readonly BASE_PATH: string = "contributor";

  constructor(
    private httpService: HttpClientService) { }

  public findPendingVideos(params: AnyObject): Observable<SearchResultView<FleenVideoView>> {
    const req: BaseRequest = this.httpService.toRequest([this.BASE_PATH, 'entries', 'videos'], params);
    return this.httpService.get(req)
      .pipe(
        map(data => mapToSearchResult(FleenVideoView, data))
      );
  }

  public findPendingVideo(id: number | string): Observable<FleenVideoView> {
    const req: BaseRequest = this.httpService.toRequest([this.BASE_PATH, 'detail', +id]);
    return this.httpService.getOne(req)
      .pipe(
        map(data => new FleenVideoView(data))
      );
  }

  public submitVideoReview(id: number | string, body: SubmitVideoReviewPayload): Observable<VideoReviewView> {
    const req: BaseRequest = this.httpService.toRequest([this.BASE_PATH, 'video', 'review', +id], null, { ...body });
    return this.httpService.post(req)
      .pipe(
        map(data => new VideoReviewView(data))
      );
  }

  public findVideoReviewHistory(id: number | string): Observable<VideoReviewHistoryResponse> {
    const req: BaseRequest = this.httpService.toRequest([this.BASE_PATH, 'videos', 'review-history', +id]);
    return this.httpService.get(req)
      .pipe(
        map(data => new VideoReviewHistoryResponse(data))
      );
  }

  public findMyVideoReviewHistory(params: AnyObject): Observable<SearchResultView<VideoReviewView>> {
    const req: BaseRequest = this.httpService.toRequest([this.BASE_PATH, 'review-history'], params);
    return this.httpService.get(req)
      .pipe(
        map(data => mapToSearchResult(VideoReviewView, data))
      );
  }

  public userCanSubmitVideoReview(id: number | string): Observable<UserCanSubmitReviewResponse> {
    const req: BaseRequest = this.httpService.toRequest([this.BASE_PATH, 'review', 'is-eligible', +id]);
    return this.httpService.get(req)
      .pipe(
        map(data => new UserCanSubmitReviewResponse(data))
      );
  }
}
