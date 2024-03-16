import {Injectable} from "@angular/core";
import {HttpClientService} from "@app/shared/service/impl";
import {Observable} from "rxjs";
import {EntityExistsResponse, GetEncodedPasswordResponse} from "@app/model/response/common";
import {BaseRequest} from "@app/model/type";

@Injectable()
export class MiscService {

  private readonly BASE_PATH: string = "misc";

  constructor(
    private httpService: HttpClientService) { }

  /**
   * @method isEmailExists
   * @description
   *   Checks if an email address already exists in the system.
   *
   * @param emailAddress - The email address to check for existence.
   * @returns {Observable<EntityExistsResponse>} - An observable emitting an EntityExistsResponse.
   */
  public isEmailExists(emailAddress: string): Observable<EntityExistsResponse> {
    const req: BaseRequest = this.httpService.toRequestV2([this.BASE_PATH, 'email-address', 'exists'], { emailAddress });
    return this.httpService.get(req, EntityExistsResponse);
  }

  /**
   * @method isPhoneNumberExists
   * @description
   *   Checks if a phone number already exists in the system.
   *
   * @param phoneNumber - The email address to check for existence.
   * @returns {Observable<EntityExistsResponse>} - An observable emitting an EntityExistsResponse.
   */
  public isPhoneNumberExists(phoneNumber: string): Observable<EntityExistsResponse> {
    const req: BaseRequest = this.httpService.toRequestV2([this.BASE_PATH, 'phone-number', 'exists'], { phoneNumber });
    return this.httpService.get(req, EntityExistsResponse);
  }

  /**
   * @method generateAndGetEncodedPassword
   * @description Generates and retrieves an encoded password from the server.
   *
   * @param password The password to be encoded.
   * @returns An observable that emits a GetEncodedPasswordResponse object.
   */
  public generateAndGetEncodedPassword(password: string): Observable<GetEncodedPasswordResponse> {
    const req: BaseRequest = this.httpService.toRequestV2([this.BASE_PATH, 'password'], { password });
    return this.httpService.get(req, GetEncodedPasswordResponse);
  }
}
