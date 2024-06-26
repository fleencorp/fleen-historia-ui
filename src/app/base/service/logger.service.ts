import {Injectable} from '@angular/core';

@Injectable()
export class LoggerService {

  constructor() { }

  public log(data: any): void {
    console.log(data);
  }

  public error(...data: any): void {
    console.error(data);
  }
}
