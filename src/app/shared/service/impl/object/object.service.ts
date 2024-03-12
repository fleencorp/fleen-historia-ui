import {Injectable} from "@angular/core";
import {HttpClientService} from "@app/shared/service/impl";
import {map, Observable} from "rxjs";
import {DeleteResponse} from "@app/model/response/common";
import {BaseRequest} from "@app/model/type";

@Injectable()
export class ObjectService {

  private readonly BASE_PATH: string = "";

  public constructor(protected httpService: HttpClientService) { }

  public deleteVideoContent(key: string): Observable<DeleteResponse> {
    const req: BaseRequest = this.httpService.toRequest([this.BASE_PATH, 'delete', 'video'], { key });
    return this.httpService.delete(req)
      .pipe(
        map(data => new DeleteResponse(data))
      );
  }

  public deleteVideoThumbnail(key: string): Observable<DeleteResponse> {
    const req: BaseRequest = this.httpService.toRequest([this.BASE_PATH, 'delete', 'video-thumbnail'], { key });
    return this.httpService.delete(req)
      .pipe(
        map(data => new DeleteResponse(data))
      );
  }
}
