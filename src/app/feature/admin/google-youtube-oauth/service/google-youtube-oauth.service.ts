import {Injectable} from '@angular/core';
import {HttpClientService} from "@app/shared/service/impl";
import {
  AddGoogleClientCredentialPayload,
  AnyObject,
  BaseRequest,
  UpdateGoogleClientCredentialPayload
} from "@app/model/type";
import {Observable} from "rxjs";
import {SearchResultView} from "@app/model/view";
import {CategoryView} from "@app/model/view/category";
import {toSearchResult} from "@app/shared/rxjs";
import {ChannelView} from "@app/model/view/channel";
import {
  YouTubeApiAfterAuthenticationResponse,
  YouTubeApiStartAuthenticationResponse
} from "@app/model/response/youtube";
import {removeProperties, removeProperty} from "@app/shared/helper";
import {GoogleClientCredentialView} from "@app/model/youtube/oauth";
import {ChannelExistsResponse} from "@app/model/response/video";
import {UpdateChannelPayload} from "@app/model/type/channel.type";

@Injectable()
export class GoogleYoutubeOauthService {

  private readonly BASE_PATH: string = "admin/google-youtube-oauth";
  private readonly CHANNEL_BASE_PATH: string = "admin/channel"

  constructor(
    private httpService: HttpClientService) { }


  public findCredentials(params: AnyObject): Observable<SearchResultView<GoogleClientCredentialView>> {
    const req: BaseRequest = this.httpService.toRequest([this.BASE_PATH, 'client-credential', 'entries'], params);
    return this.httpService.get(req)
      .pipe(
        toSearchResult(GoogleClientCredentialView),
      );
  }

  public findCredential(id: number | string): Observable<GoogleClientCredentialView> {
    const req: BaseRequest = this.httpService.toRequest([this.BASE_PATH, 'client-credential', 'detail', +id]);
    return this.httpService.get(req, GoogleClientCredentialView);
  }

  public findChannelsByCredential(params: AnyObject): Observable<SearchResultView<ChannelView>> {
    const { id } = params;
    removeProperties(params, ['q', 'id']);
    const req: BaseRequest = this.httpService.toRequest([this.BASE_PATH, 'client-credential', 'channels', +id], params);
    return this.httpService.get(req)
      .pipe(
        toSearchResult(ChannelView),
      );
  }

  public addClientCredential(body: AddGoogleClientCredentialPayload): Observable<GoogleClientCredentialView> {
    const req: BaseRequest = this.httpService.toRequest([this.BASE_PATH, 'add-client-credential'], null, { ...body });
    return this.httpService.post(req, GoogleClientCredentialView);
  }

  public updateClientCredential(id: number | string, body: UpdateGoogleClientCredentialPayload): Observable<GoogleClientCredentialView> {
    const req: BaseRequest = this.httpService.toRequest([this.BASE_PATH, 'update-client-credential', +id], null, { ...body });
    return this.httpService.update(req, GoogleClientCredentialView);
  }

  public getAuthorizationUriByCredential(id: number | string): Observable<YouTubeApiStartAuthenticationResponse> {
    const req: BaseRequest = this.httpService.toRequest([this.BASE_PATH, 'get-authorization-uri', +id]);
    return this.httpService.get(req, YouTubeApiStartAuthenticationResponse);
  }

  public verifyAuthorizationCodeAndAddChannelOrRefreshToken(credentialId: number | string, authorizationCode: string): Observable<YouTubeApiAfterAuthenticationResponse> {
    const req: BaseRequest = this.httpService.toRequest([this.BASE_PATH, 'verify-authorization-code-add-channel-refresh-token', +credentialId], { code: authorizationCode });
    return this.httpService.post(req, YouTubeApiAfterAuthenticationResponse);
  }

  public doesChannelExist(id: number | string): Observable<ChannelExistsResponse> {
    const req: BaseRequest = this.httpService.toRequest([this.BASE_PATH, 'delete', +id]);
    return this.httpService.get(req, ChannelExistsResponse);
  }

  public updateChannel(id: number | string, body: UpdateChannelPayload): Observable<ChannelView> {
    const req: BaseRequest = this.httpService.toRequest([this.CHANNEL_BASE_PATH, 'update-channel', +id], null, { ...body });
    return this.httpService.update(req, ChannelView);
  }
}
