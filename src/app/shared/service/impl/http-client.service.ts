import {Injectable} from '@angular/core';
import {LoggerService} from "../../../base/service";
import {AnyArray, AnyProp, BaseRequest} from "../../../model/type";
import {isObject, isTruthy} from "../../helper";

@Injectable()
export class HttpClientService {

  private readonly logger: LoggerService;

  constructor(logger: LoggerService) {
    this.logger = logger;
  }



}
