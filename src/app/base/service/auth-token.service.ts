import {Injectable} from '@angular/core';
import {LocalStorageService} from "./";
import {ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY} from "../../constant";
import {isTruthy} from "../../shared/helper";


/**
 * @class AuthTokenService
 * @description
 *   This class provides methods for managing authentication tokens using a LocalStorageService.
 *
 * @author Yusuf Alamu Musa
 * @version 1.0
 */
@Injectable()
export class AuthTokenService {
  private readonly localStorageService: LocalStorageService;

  /**
   * @constructor
   * @param localStorageService - An instance of the LocalStorageService to be used for token storage.
   */
  constructor(localStorageService: LocalStorageService) {
    this.localStorageService = localStorageService;
  }

  /**
   * @method getAccessToken
   * @description
   *   Retrieves the access token from the local storage if it exists.
   *
   * @returns {string} - The access token or an empty string if it does not exist.
   */
  public getAccessToken(): string {
    return this.isTokenExist(ACCESS_TOKEN_KEY)
      ? this.getToken(ACCESS_TOKEN_KEY)
      : '';
  }

  /**
   * @method getAuthorizationRefreshToken
   * @description
   *   Retrieves the authorization refresh token from local storage if it exists.
   *
   * @returns {string} - The refresh token or an empty string if it does not exist.
   */
  public getAuthorizationRefreshToken(): string {
    return this.isTokenExist(REFRESH_TOKEN_KEY)
      ? this.getToken(REFRESH_TOKEN_KEY)
      : '';
  }

  /**
   * @method clearAuthTokens
   * @description
   *   Clears both the access and refresh tokens from local storage.
   */
  public clearAuthTokens(): void {
    this.localStorageService.clearObject(ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY);
  }

  /**
   * @private
   * @method getToken
   * @description
   *   Retrieves a token from local storage based on the provided token key.
   *
   * @param {string} tokenKey - The key associated with the token.
   * @returns {string} - The retrieved token.
   */
  private getToken(tokenKey: string): string {
    return this.localStorageService.getObject(tokenKey) as string;
  }

  /**
   * @private
   * @method isTokenExist
   * @description
   *   Checks if a token with the provided key exists in local storage.
   *
   * @param {string} tokenKey - The key associated with the token.
   * @returns {boolean} - True if the token exists, false otherwise.
   */
  private isTokenExist(tokenKey: string): boolean {
    const tokenValue: string | null = this.localStorageService.getObject(tokenKey);
    return this.localStorageService.hasObject(tokenKey) && isTruthy(tokenValue);
  }
}
