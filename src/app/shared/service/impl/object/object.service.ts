import {Injectable} from "@angular/core";
import {HttpClientService, S3Service} from "@app/shared/service/impl";
import {Observable} from "rxjs";
import {DeleteResponse} from "@app/model/response/common";
import {BaseRequest} from "@app/model/type";

@Injectable()
export class ObjectService {

  private readonly BASE_PATH: string = "object";

  public constructor(
      protected httpService: HttpClientService,
      protected s3Service: S3Service) { }

  public deleteVideoContent(keyOrObjectUrl: string): Observable<DeleteResponse> {
    const key: string | null = this.s3Service.getObjectKeyFromSignedUrl(keyOrObjectUrl);
    const req: BaseRequest = this.httpService.toRequest([this.BASE_PATH, 'delete', 'video'], { key });
    return this.httpService.delete(req, DeleteResponse);
  }

  public deleteVideoThumbnail(keyOrObjectUrl: string): Observable<DeleteResponse> {
    const key: string | null = this.s3Service.getObjectKeyFromSignedUrl(keyOrObjectUrl);
    const req: BaseRequest = this.httpService.toRequest([this.BASE_PATH, 'delete', 'video-thumbnail'], { key });
    return this.httpService.delete(req, DeleteResponse);
  }
}
