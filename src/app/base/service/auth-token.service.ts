import {Injectable} from '@angular/core';
import {LocalStorageService, LoggerService} from "./";
import {ACCESS_TOKEN_KEY, ANY_EMPTY, REFRESH_TOKEN_KEY} from "@app/constant";
import {isTruthy} from "@app/shared/helper";
import * as jwtDecode from 'jwt-decode';
import {AnyObject} from "@app/model/type";


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
  private readonly logger: LoggerService

  /**
   * @constructor
   * @description
   *   Initializes a new instance of the AuthTokenService class.
   *
   * @param localStorageService - An instance of the LocalStorageService to be used for token storage.
   * @param loggerService - An instance of the LoggerService to be used for logging.
   */
  constructor(
    localStorageService: LocalStorageService,
    loggerService: LoggerService
  ) {
    this.localStorageService = localStorageService;
    this.logger = loggerService;
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

  /**
   * @method getAccessTokenClaims
   * @description
   *   Retrieves the claims (payload) from the stored access token, if available.
   *
   * @returns {AnyObject} - The claims extracted from the access token.
   */
  public getAccessTokenClaims(): AnyObject {
    const authToken: string = this.getToken(ACCESS_TOKEN_KEY);
    if (isTruthy(authToken)) {
      return this.getClaims(authToken);
    }
    return ANY_EMPTY;
  }

  /**
   * @method getClaims
   * @description
   *   Decodes and retrieves the claims (payload) from a given token using the jwtDecode library.
   *
   * @param {string} token - The token from which to extract claims.
   * @returns {AnyObject} - The claims extracted from the token.
   */
  public getClaims(token: string): AnyObject {
    let claims: AnyObject = ANY_EMPTY;
    if (isTruthy(token) && isTruthy(token.trim())) {
      try {
        claims = jwtDecode.default(token);
      } catch (error: any) {
        this.logger.error(error);
      }
    }
    return claims;
  }

  /**
   * @method isTokenValid
   * @description
   *   Checks if a given token is valid by attempting to decode it using the jwtDecode library.
   *
   * @param {string} token - The token to be validated.
   * @returns {boolean} - A boolean indicating whether the token is valid or not.
   */
  public isTokenValid(token: string): boolean {
    if (isTruthy(token) && isTruthy(token.trim())) {
      try {
        jwtDecode.default(token);
        return true;
      } catch (error: any) {
        this.logger.error(error);
      }
    }
    return false;
  }

  /**
   * Retrieves the profile photo URL from the access token claims.
   * @returns The URL of the profile photo.
   */
  public getProfilePhoto(): string {
    return this.getAccessTokenClaims()['profilePhoto'];
  }

  public isAdmin(): boolean {
    if (this.isTokenValid(this.getAccessToken())) {
      const claims: AnyObject = this.getAccessTokenClaims();
      if (claims && claims['authorities']) {
        const authorities: string[] = claims['authorities'];
        return authorities.includes('ROLE_ADMINISTRATOR') ||
          authorities.includes('ROLE_SUPER_ADMINISTRATOR');
      }
    }
    return false;
  }

}
