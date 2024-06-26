import {Injectable} from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import {catchError, EMPTY, Observable, Subject} from 'rxjs';
import {Router, RouterStateSnapshot} from "@angular/router";
import {Location} from "@angular/common";
import {AuthTokenService, LocalStorageService, SessionStorageService} from "@app/base/service";
import {AuthenticationService} from "@app/feature/authentication/service";
import {
  AUTHORIZATION_BEARER,
  AUTHORIZATION_HEADER,
  UNAUTHORIZED_REQUEST_STATUS_CODE,
  USER_DESTINATION_PAGE_KEY
} from "@app/constant";
import {isTruthy, toCamelCaseKeys} from "@app/shared/helper";
import {API_BASE_PATH} from "@app/config";
import {RefreshTokenResponse} from "@app/model/response/authentication";
import {BaseHttpService} from "@app/shared/service/impl";
import {environment} from "@app/environment";

/**
 * Interceptor for handling authorization, refreshing tokens, and redirecting unauthorized requests.
 *
 * Implements the HttpInterceptor interface to intercept HTTP requests and modify them.
 *
 * @public
 * @author Yusuf Alamu Musa
 */
@Injectable()
export class AuthorizationInterceptor implements HttpInterceptor {

  /**
   * The API endpoint for refreshing tokens.
   * @private
   */
  private readonly API_REFRESH_TOKEN_ENDPOINT: string = 'verification/refresh-token';

  /**
   * URLs that are whitelisted from the interceptor logic.
   * @private
   */
  private readonly WHITELIST: string[] = [
    '/auth/sign-in',
    '/auth/sign-up',
    '/auth/forgot-password',
    '/auth/verify-reset-password-code',
    '/misc/email-address',
    '/misc/phone-number',
    '/homepage/videos/entries',
    '/homepage/video',
    '/contributor/video/comment',
    '/contributor/video/review-history',
  ];

  /**
   * External whitelisted domains.
   * @public
   */
  public readonly EXTERNAL_WHITELIST: RegExp[] = [
    /^(https?:\/\/)?[^\/]*\.s3\.amazonaws\.com/,
    /^(https?:\/\/)?(www\.)?google\.com\/recaptcha\/api2/
  ];

  public tokenRefreshedSubject: Subject<boolean> = new Subject<boolean>();

  /**
   * Creates an instance of AuthorizationInterceptor.
   *
   * @constructor
   * @param {LocalStorageService} localStorageService - Service for interacting with local storage.
   * @param {BaseHttpService} baseHttpService - Service for making HTTP requests.
   * @param {AuthenticationService} authenticationService - Service for handling authentication.
   * @param {AuthTokenService} tokenService - Service for managing authentication tokens.
   * @param sessionStorageService - Service for session and other related storage services
   * @param {Router} router - Angular router service.
   * @param {Location} location - Angular location service.
   */
  public constructor(
    private readonly localStorageService: LocalStorageService,
    private readonly baseHttpService: BaseHttpService,
    private readonly authenticationService: AuthenticationService,
    private readonly tokenService: AuthTokenService,
    private readonly sessionStorageService: SessionStorageService,
    private readonly router: Router,
    private readonly location: Location
  ) { }

  /**
   * Intercepts HTTP requests and performs necessary actions like adding Authorization header,
   * handling whitelisted URLs, and managing authentication errors.
   * @param request - The original HTTP request.
   * @param next - The next HTTP handler in the chain.
   * @returns An observable of the HTTP event.
   */
  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.isUrlWhitelisted(request.url) || this.isUrlWhitelistedAndExternal(request.url)) {
      return next.handle(request);
    }

    const authToken: string = this.getAccessToken();
    return this.handleRequestWithAuthorization(request, next, authToken);
  }

  /**
   * Handles the original request by adding Authorization header and handling errors.
   * @param request - The original HTTP request.
   * @param next - The next HTTP handler in the chain.
   * @param authToken - The access token to be added to the request header.
   * @returns An observable of the HTTP event.
   */
  private handleRequestWithAuthorization(
    request: HttpRequest<any>,
    next: HttpHandler,
    authToken: string,
  ): Observable<HttpEvent<any>> {
    const authRequest: HttpRequest<any> = this.createAuthRequest(request, authToken);

    return next.handle(authRequest).pipe(
      catchError((response: HttpErrorResponse): Observable<any> => {
        const { error } = response;

        if (error.status === UNAUTHORIZED_REQUEST_STATUS_CODE) {
          this.saveUserDestinationPage(this.router.url)
          return this.clearTokensAndStartAuthentication();
        }

        return this.baseHttpService.handleError(error);
      })
    );
  }

  protected saveUserDestinationPage(url: string): void {
    console.log('Saving........................');
    this.sessionStorageService.setObject(USER_DESTINATION_PAGE_KEY, url);
  }

  /**
   * Creates a new HTTP request by cloning the original request and adding Authorization header.
   * @param originalRequest - The original HTTP request.
   * @param authToken - The access token to be added to the request header.
   * @returns The new HTTP request with Authorization header.
   */
  private createAuthRequest(originalRequest: HttpRequest<any>, authToken: string): HttpRequest<any> {
    return originalRequest.clone({ setHeaders: { [AUTHORIZATION_HEADER]: authToken } });
  }

  /**
   * Handles unauthorized requests by attempting to refresh the access token.
   *
   * @param {HttpRequest<any>} request - The unauthorized HTTP request.
   * @param {HttpHandler} next - The next HTTP handler in the chain.
   * @returns {Observable<any>} An observable of the refreshed token response.
   * @private
   */
/*  private handleUnauthorized(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    const refreshToken: string = this.getRefreshToken();
    if (isTruthy(refreshToken))
      return this.clearTokensAndStartAuthentication();
    }

    const refreshRequest: HttpRequest<any> = this.buildRefreshTokenRequest(request, refreshToken);
    return next.handle(refreshRequest)
      .pipe(
        tap((value: HttpEvent<any>): void => {
          this.handleRefreshTokenResponse(value);
          this.tokenRefreshedSubject.next(true);
        }),
        catchError(() => this.clearTokensAndStartAuthentication())
/!*        *!/
/!*        switchMap((): ObservableInput<any> => {
          console.log('Problems');
/!*          setTimeout((): any => {
            location.reload();
          })
          return of(EMPTY);
          *!/
          const authToken: string = this.getAccessToken();
          const authRequest: HttpRequest<any> = this.createAuthRequest(request, authToken);
          return next.handle(authRequest);
          // this.reloadCurrentPage();
          // return of(EMPTY);
        })*!/
    );
  }*/

  /**
   * Private method that handles the response after sending a refresh token request.
   * If the response is an instance of HttpResponse, it extracts the body and invokes
   * the method to handle the successful refresh token response.
   * @param value - The HTTP event representing the response.
   */
  private handleRefreshTokenResponse(value: HttpEvent<any>): void {
    if (value instanceof HttpResponse) {
      const { body } = value as HttpResponse<any>;
      this.handleRefreshTokenSuccess(body);
    }
  }


  /**
   * Private method responsible for building a refresh token request.
   * @param request - The original HTTP request.
   * @param refreshToken - The refresh token to be added to the request header.
   * @returns The new HTTP request with Authorization header and the refresh token endpoint.
   */
  private buildRefreshTokenRequest(request: HttpRequest<any>, refreshToken: string): HttpRequest<any> {
    return request.clone({
      setHeaders: { [AUTHORIZATION_HEADER]: refreshToken },
      url: this.baseHttpService.buildPathUri(this.API_REFRESH_TOKEN_ENDPOINT),
      method: 'GET'
    });
  }

  /**
   * Private method that handles a successful refresh token response.
   * Updates the authentication tokens and navigates to the destination page.
   * @param {RefreshTokenResponse} body - The response body containing new authentication tokens.
   */
  private handleRefreshTokenSuccess(body: RefreshTokenResponse): void {
    body = toCamelCaseKeys(body);
    this.authenticationService.setAuthToken(body);

    // this.gotoDestination();
  }

  /**
   * Clears data and starts the authentication process.
   *
   * @returns {Observable<any>} An empty observable.
   * @private
   */
  private clearTokensAndStartAuthentication(): Observable<any> {
    this.tokenService.clearAuthTokens();
    this.startAuthentication();
    return EMPTY;
  }

  /**
   * Initiates the authentication process.
   *
   * @private
   */
  private startAuthentication(): void {
    this.authenticationService.startAuthentication(this.router);
  }

  /**
   * Redirects to the destination after successful authorization.
   *
   * @private
   */
  private gotoDestination(): void {
    const destinationRoute: string | null = this.getUserDestinationPage();
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/dashboard']);
    });
  }

  /**
   * Gets the access token with the Bearer token prefix.
   *
   * @returns {string} The access token.
   * @private
   */
  private getAccessToken(): string {
    const accessToken: string = this.tokenService.getAccessToken();
    return isTruthy(accessToken) ? AUTHORIZATION_BEARER.replace('{}', accessToken) : '';
  }

  /**
   * Gets the refresh token with the Bearer token prefix.
   *
   * @returns {string} The refresh token.
   * @private
   */
  private getRefreshToken(): string {
    const refreshToken: string = this.tokenService.getAuthorizationRefreshToken();
    return isTruthy(refreshToken) ? AUTHORIZATION_BEARER.replace('{}', refreshToken) : '';
  }

  /**
   * Checks if the URL is whitelisted.
   *
   * @param {string} url - The URL to check.
   * @returns {boolean} True if whitelisted; otherwise, false.
   * @private
   */
  private isUrlWhitelisted(url: string): boolean {
    url = this.getRequestPath(url);
    return this.WHITELIST.some((excludedUrl: string) => url.startsWith(excludedUrl));
  }

  /**
   * Checks if the URL is whitelisted externally.
   *
   * @param {string} url - The URL to check.
   * @returns {boolean} True if whitelisted externally; otherwise, false.
   * @private
   */
  private isUrlWhitelistedAndExternal(url: string): boolean {
    return this.EXTERNAL_WHITELIST.some((pattern: RegExp): boolean => pattern.test(url));
  }

  /**
   * Gets the request path by removing the base URL and API base path.
   *
   * @param {string} url - The URL to process.
   * @returns {string} The processed request path.
   * @private
   */
  private getRequestPath(url: string): string {
    return url.replace(environment['baseUrl'] + "/", "")
      .replace(API_BASE_PATH, "");
  }

  public reloadCurrentPage(): void {
    const currentUrl: string = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true})
      .then(async (): Promise<void> => {
        await this.router.navigate([currentUrl]);
    });
  }

  protected getUserDestinationPage(): string | null {
    return this.sessionStorageService.getObject(USER_DESTINATION_PAGE_KEY);
  }

  protected removeUserDestinationPage(): void {
    this.sessionStorageService.removeObject(USER_DESTINATION_PAGE_KEY);
  }

  public emitTokenRefreshed(refreshed: boolean): void {
    this.tokenRefreshedSubject.next(refreshed);
  }
}
