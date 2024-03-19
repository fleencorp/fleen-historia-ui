import {Injectable} from "@angular/core";
import {HttpClientService} from "@app/shared/service/impl";
import {BaseRequest} from "@app/model/type";
import {Observable} from "rxjs";
import {DeleteResponse} from "@app/model/response/common";
import {CreateChannelPayload} from "@app/model/type/channel.type";
import {ChannelView} from "@app/model/view/channel";

@Injectable()
export class AdminChannelService {

  private readonly BASE_PATH: string = "admin/channel";

  constructor(
    private httpService: HttpClientService) { }

  public addChannel(body: CreateChannelPayload): Observable<ChannelView> {
    const req: BaseRequest = this.httpService.toRequest([this.BASE_PATH, 'add'], null, { ...body });
    return this.httpService.post(req, ChannelView);
  }

  public deleteChannel(id: number | string): Observable<DeleteResponse> {
    const req: BaseRequest = this.httpService.toRequest([this.BASE_PATH, 'delete', +id]);
    return this.httpService.delete(req, DeleteResponse);
  }
}
