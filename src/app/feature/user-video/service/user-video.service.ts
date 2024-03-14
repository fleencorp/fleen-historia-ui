import {Injectable} from "@angular/core";
import {HttpClientService} from "@app/shared/service/impl";
import {BaseVideoService} from "@app/base/service";

@Injectable()
export class UserVideoService extends BaseVideoService {

  protected override readonly BASE_PATH: string = "user/video";

  constructor(
      httpService: HttpClientService) {
    super(httpService);
  }

}
