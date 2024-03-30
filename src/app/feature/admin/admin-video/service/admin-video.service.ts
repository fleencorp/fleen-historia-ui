import {Injectable} from '@angular/core';
import {HttpClientService} from "@app/shared/service/impl";
import {BaseRequest, DeleteIdsPayload, UpdateVideoVisibilityPayload} from "@app/model/type";
import {Observable} from "rxjs";
import {CountAllResponse, DeleteResponse} from "@app/model/response/common";
import {BaseVideoService} from "@app/base/service";
import {FleenVideoView} from "@app/model/view/video";
import {GetCreateVideoResponse} from "@app/model/response/video";

@Injectable()
export class AdminVideoService extends BaseVideoService {

  protected override readonly BASE_PATH: string = "admin/video";

  constructor(
      httpService: HttpClientService) {
    super(httpService);
  }

  public override getDataForCreateVideo(): Observable<GetCreateVideoResponse> {
    const req: BaseRequest = this.httpService.toRequest(['user', 'video', 'get-create-video']);
    return this.httpService.get(req, GetCreateVideoResponse);
  }

  public updateVideoVisibility(id: number | string, body: UpdateVideoVisibilityPayload): Observable<FleenVideoView> {
    const req: BaseRequest = this.httpService.toRequest([this.BASE_PATH, 'update', 'visibility', +id], null, { ...body });
    return this.httpService.update(req, FleenVideoView);
  }

  public deleteVideo(id: number | string): Observable<DeleteResponse> {
    const req: BaseRequest = this.httpService.toRequest([this.BASE_PATH, 'delete', 'one', +id]);
    return this.httpService.delete(req, DeleteResponse);
  }

  public deleteManyVideos(body: DeleteIdsPayload): Observable<DeleteResponse> {
    const req: BaseRequest = this.httpService.toRequest([this.BASE_PATH, 'delete', 'many'], null, { ...body });
    return this.httpService.deleteMany(req, DeleteResponse);
  }

  public countAllVideos(): Observable<CountAllResponse> {
    const req: BaseRequest = this.httpService.toRequest([this.BASE_PATH, 'count-all']);
    return this.httpService.get(req, CountAllResponse);
  }

  public deleteAllVideos(): Observable<DeleteResponse> {
    const req: BaseRequest = this.httpService.toRequest([this.BASE_PATH, 'delete', 'all']);
    return this.httpService.delete(req, DeleteResponse);
  }

}
