import {Injectable} from "@angular/core";
import {HttpClientService} from "@app/shared/service/impl";
import {BaseVideosService} from "@app/base/service/base-videos.service";

@Injectable()
export class UserVideoService extends BaseVideosService {

  protected override readonly BASE_PATH: string = "user/video";

  constructor(
      httpService: HttpClientService) {
    super(httpService);
  }

}
