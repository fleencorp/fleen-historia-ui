import {Injectable} from '@angular/core';
import {HttpClientService} from "@app/shared/service/impl";
import {map, Observable} from "rxjs";
import {BaseRequest} from "@app/model/type";
import {SignedUrlResponse} from "@app/model/response/object";

@Injectable()
export class SignedUrlService {

  private readonly BASE_PATH: string = "signed-url";

  public constructor(protected httpService: HttpClientService) { }

  public generateForProfilePhoto(fileName: string): Observable<SignedUrlResponse> {
    const req: BaseRequest = this.httpService.toRequest([this.BASE_PATH, 'profile-photo'], { fileName });
    return this.httpService.get(req)
      .pipe(
        map(data => new SignedUrlResponse(data))
      );
  }

  public generateForVideoObject(fileName: string): Observable<SignedUrlResponse> {
    const req: BaseRequest = this.httpService.toRequest([this.BASE_PATH, 'video-object'], { fileName });
    return this.httpService.get(req)
      .pipe(
        map(data => new SignedUrlResponse(data))
      );
  }

  public generateForVideoThumbnail(fileName: string): Observable<SignedUrlResponse> {
    const req: BaseRequest = this.httpService.toRequest([this.BASE_PATH, 'video-thumbnail'], { fileName });
    return this.httpService.get(req)
      .pipe(
        map(data => new SignedUrlResponse(data))
      );
  }
}
