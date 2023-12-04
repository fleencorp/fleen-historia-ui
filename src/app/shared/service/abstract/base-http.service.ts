import {API_BASE_PATH, API_HOST_URL, HTTP_REQUEST_RETRY_TIMES} from "../../../config/base-config";


export abstract class BaseHttpService {

  protected HOST_URL: string = API_HOST_URL;
  protected BASE_PATH: string = API_BASE_PATH;
  protected RETRY_TIMES: number = HTTP_REQUEST_RETRY_TIMES;

  constructor() { }
}
