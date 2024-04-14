import {Injectable} from '@angular/core';
import {HttpClientService} from "@app/shared/service/impl";
import {
  AnyObject,
  BaseRequest,
  SubmitCommentPayload,
  SubmitReplyPayload,
  SubmitVideoReviewPayload
} from "@app/model/type";
import {Observable} from "rxjs";
import {SearchResultView} from "@app/model/view";
import {FleenVideoView, VideoReviewView} from "@app/model/view/video";
import {
  SubmitCommentResponse,
  SubmitReplyResponse,
  SubmitVideoReviewResponse,
  UserCanSubmitReviewResponse,
  VideoCommentResponse,
  VideoReviewHistoryResponse
} from "@app/model/response/video";
import {toSearchResult} from "@app/shared/rxjs";
import {BaseVideoService} from "@app/base/service";

@Injectable()
export class ContributorService extends BaseVideoService {

  protected override readonly BASE_PATH: string = "contributor";

  public constructor(httpService: HttpClientService) {
    super(httpService);
  }

  public findPendingVideos(params: AnyObject): Observable<SearchResultView<FleenVideoView>> {
    const req: BaseRequest = this.httpService.toRequest([this.BASE_PATH, 'entries', 'videos'], params);
    return this.httpService.get(req)
      .pipe(
        toSearchResult(FleenVideoView),
      );
  }

  public findPendingVideo(id: number | string): Observable<FleenVideoView> {
    const req: BaseRequest = this.httpService.toRequest([this.BASE_PATH, 'detail', +id]);
    return this.httpService.getOne(req, FleenVideoView);
  }

  public submitVideoReview(id: number | string, body: SubmitVideoReviewPayload): Observable<SubmitVideoReviewResponse> {
    const req: BaseRequest = this.httpService.toRequest([this.BASE_PATH, 'video', 'review', +id], null, { ...body });
    return this.httpService.post(req, SubmitVideoReviewResponse);
  }

  public findMyVideoReviewHistory(params: AnyObject): Observable<SearchResultView<VideoReviewView>> {
    const req: BaseRequest = this.httpService.toRequest([this.BASE_PATH, 'review-history'], params);
    return this.httpService.get(req)
      .pipe(
        toSearchResult(VideoReviewView)
      );
  }

  public userCanSubmitVideoReview(id: number | string): Observable<UserCanSubmitReviewResponse> {
    const req: BaseRequest = this.httpService.toRequest([this.BASE_PATH, 'review', 'is-eligible', +id]);
    return this.httpService.get(req, UserCanSubmitReviewResponse);
  }
}
