import {Injectable} from '@angular/core';
import {HttpClientService} from "@app/shared/service/impl";
import {BaseRequest, DeleteIdsPayload} from "@app/model/type";
import {map, Observable} from "rxjs";
import {CountAllResponse, DeleteResponse} from "@app/model/response/common";
import {BaseVideoService} from "@app/base/service";

@Injectable({
  providedIn: 'root'
})
export class AdminVideoService extends BaseVideoService {

  protected override readonly BASE_PATH: string = "admin/video";

  constructor(
      httpService: HttpClientService) {
    super(httpService);
  }

  public deleteVideo(id: number | string): Observable<DeleteResponse> {
    const req: BaseRequest = this.httpService.toRequest([this.BASE_PATH, 'delete', 'one', +id]);
    return this.httpService.delete(req)
      .pipe(
        map(data => new DeleteResponse(data))
      );
  }

  public deleteManyVideos(body: DeleteIdsPayload): Observable<DeleteResponse> {
    const req: BaseRequest = this.httpService.toRequest([this.BASE_PATH, 'delete', 'many'], null, { ...body });
    return this.httpService.delete(req)
      .pipe(
        map(data => new DeleteResponse(data))
      );
  }

  public countAllVideos(): Observable<CountAllResponse> {
    const req: BaseRequest = this.httpService.toRequest([this.BASE_PATH, 'count-all']);
    return this.httpService.get(req)
      .pipe(
        map(data => new CountAllResponse(data))
      );
  }

  public deleteAllVideos(): Observable<DeleteResponse> {
    const req: BaseRequest = this.httpService.toRequest([this.BASE_PATH, 'delete', 'all']);
    return this.httpService.delete(req)
      .pipe(
        map(data => new DeleteResponse(data))
      );
  }

}