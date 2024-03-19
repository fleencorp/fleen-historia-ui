import {Injectable} from '@angular/core';
import {HttpClientService} from "@app/shared/service/impl";
import {AnyObject, BaseRequest} from "@app/model/type";
import {Observable} from "rxjs";
import {
  YouTubeApiAfterAuthenticationResponse,
  YouTubeApiStartAuthenticationResponse,
  YouTubeCategoryResponse,
  YouTubeChannelResponse,
  YoutubeVideoResponse
} from "@app/model/response/youtube";
import {SearchResultView} from "@app/model/view";
import {DeleteResponse} from "@app/model/response/common";
import {toSearchResult} from "@app/shared/rxjs";

@Injectable()
export class AdminYoutubeService {

  protected readonly BASE_PATH: string = "admin/youtube";

  constructor(protected httpService: HttpClientService) { }

  public findYouTubeCategories(): Observable<SearchResultView<YouTubeCategoryResponse>> {
    const req: BaseRequest = this.httpService.toRequest([this.BASE_PATH, 'category', 'entries']);
    return this.httpService.get(req)
      .pipe(
        toSearchResult(YouTubeCategoryResponse)
      );
  }

  public findYouTubeChannels(): Observable<SearchResultView<YouTubeChannelResponse>> {
    const req: BaseRequest = this.httpService.toRequest([this.BASE_PATH, 'channel', 'entries']);
    return this.httpService.get(req)
      .pipe(
        toSearchResult(YouTubeChannelResponse)
      );
  }

  public findYouTubeChannelVideos(id: number | string, params: AnyObject): Observable<SearchResultView<YoutubeVideoResponse>> {
    const req: BaseRequest = this.httpService.toRequest([this.BASE_PATH, 'channel', 'detail', id, 'videos'], params);
    return this.httpService.get(req)
      .pipe(
        toSearchResult(YoutubeVideoResponse)
      );
  }

  public deleteVideoFromYouTube(id: number | string): Observable<DeleteResponse> {
    const req: BaseRequest = this.httpService.toRequest([this.BASE_PATH, 'channel', 'delete', 'video', id]);
    return this.httpService.delete(req, DeleteResponse);
  }

  public startAuthentication(): Observable<YouTubeApiStartAuthenticationResponse> {
    const req: BaseRequest = this.httpService.toRequest([this.BASE_PATH, 'start-authentication']);
    return this.httpService.get(req, YouTubeApiStartAuthenticationResponse);
  }

  public verifyAuthorizationCodeAndInitializeCredentials(authorizationCode: string): Observable<YouTubeApiAfterAuthenticationResponse> {
    const req: BaseRequest = this.httpService.toRequest([this.BASE_PATH, 'verify-authorization-code'], {code: authorizationCode});
    return this.httpService.get(req, YouTubeApiAfterAuthenticationResponse);
  }
}
