import {Injectable} from '@angular/core';
import {fromEvent, map, merge, Observable, Observer} from "rxjs";

@Injectable()
export class NetworkService {

  public monitor: Observable<any> = merge(
    fromEvent(window, 'online').pipe(map((): boolean => true)),
    fromEvent(window, 'offline').pipe(map((): boolean => false)),
    new Observable((sub: Observer<boolean>): void => {
      sub.next(navigator.onLine);
      sub.complete();
    })
  );

  public constructor() {}

}
