import {Injectable} from '@angular/core';
import {map, Observable} from "rxjs";
import {OnExecuteData, ReCaptchaV3Service} from "ng-recaptcha";

@Injectable()
export class CustomRecaptchaService {

  public constructor(protected recaptchaService: ReCaptchaV3Service) {}


  public extractRecaptchaToken(action: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      this.recaptchaService.execute(action).subscribe((): void => {
        const resultObservable: Observable<OnExecuteData> = this.recaptchaService.onExecute;
        resultObservable.pipe(
            map((result: OnExecuteData) => result.token) // Extract the token from OnExecuteData
          ).subscribe({
          next: (token: string): void => { resolve(token); },
          error: (error): void => { reject(error); }
        });
      });
    });
  }

}
