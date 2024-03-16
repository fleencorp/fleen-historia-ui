import {Injectable} from '@angular/core';
import {HttpClientService} from "@app/shared/service/impl";
import {AnyObject, BaseRequest} from "@app/model/type";
import {map, Observable} from "rxjs";
import {
  YouTubeApiAfterAuthenticationResponse,
  YouTubeApiStartAuthenticationResponse,
  YouTubeCategoryResponse,
  YouTubeChannelResponse, YoutubeVideoResponse
} from "@app/model/response/youtube";
import {SearchResultView} from "@app/model/view";
import {mapToSearchResult} from "@app/shared/helper";
import {DeleteResponse} from "@app/model/response/common";
import {toModel} from "@app/shared/rxjs";

@Injectable()
export class AdminYoutubeService {

  protected readonly BASE_PATH: string = "admin/youtube";

  constructor(protected httpService: HttpClientService) { }

  public findYouTubeCategories(): Observable<YouTubeCategoryResponse> {
    const req: BaseRequest = this.httpService.toRequest([this.BASE_PATH, 'category', 'entries']);
    return this.httpService.get(req)
      .pipe(
        map(data => new YouTubeCategoryResponse(data))
      );
  }

  public findYouTubeChannels(): Observable<YouTubeChannelResponse> {
    const req: BaseRequest = this.httpService.toRequest([this.BASE_PATH, 'channel', 'entries']);
    return this.httpService.get(req)
      .pipe(
        map(data => new YouTubeChannelResponse(data))
      );
  }

  public findYouTubeChannelVideos(id: number | string, params: AnyObject): Observable<SearchResultView<YoutubeVideoResponse>> {
    const req: BaseRequest = this.httpService.toRequest([this.BASE_PATH, 'channel', 'detail', id, 'videos'], params);
    return this.httpService.get(req)
      .pipe(
        map(data => mapToSearchResult(YoutubeVideoResponse, data))
      );
  }

  public deleteVideoFromYouTube(id: number | string): Observable<DeleteResponse> {
    const req: BaseRequest = this.httpService.toRequest([this.BASE_PATH, 'channel', 'delete', 'video', id]);
    return this.httpService.delete(req)
      .pipe(
        map(data => new DeleteResponse(data))
      );
  }

  public startAuthentication(): Observable<YouTubeApiStartAuthenticationResponse> {
    const req: BaseRequest = this.httpService.toRequest([this.BASE_PATH, 'start-authentication']);
    return this.httpService.get(req)
      .pipe(
        map(data => new YouTubeApiStartAuthenticationResponse(data))
      );
  }

  public verifyAuthorizationCodeAndInitializeCredentials(authorizationCode: string): Observable<YouTubeApiAfterAuthenticationResponse> {
    const req: BaseRequest = this.httpService.toRequest([this.BASE_PATH, 'verify-authorization-code'], {code: authorizationCode});
    return this.httpService.get(req)
      .pipe(
        map(data => new YouTubeApiAfterAuthenticationResponse(data))
      );
  }
}
