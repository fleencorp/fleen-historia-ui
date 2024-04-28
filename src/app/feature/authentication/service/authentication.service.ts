import {Injectable} from '@angular/core';
import {HttpClientService} from "@app/shared/service/impl";
import {AuthTokenService, LocalStorageService} from "@app/base/service";
import {Observable} from "rxjs";
import {EntityExistsResponse} from "@app/model/response/common";
import {
  AnyObject,
  AuthVerificationPayload,
  BaseRequest,
  ChangePasswordPayload,
  ForgotPasswordPayload,
  ResendVerificationCodePayload,
  ResetPasswordPayload,
  SignInPayload,
  SignUpPayload
} from "@app/model/type";
import {
  ForgotPasswordResponse,
  InitiatePasswordChangeResponse,
  RefreshTokenResponse,
  SignInResponse,
  SignInUpResponse,
  SignUpResponse
} from "@app/model/response/authentication";
import {FleenResponse} from "@app/model/response";
import {
  ACCESS_TOKEN_KEY,
  AUTHENTICATION_STATUS_KEY,
  AUTHORIZATION_HEADER,
  RECAPTCHA_TOKEN_HEADER_KEY,
  REFRESH_TOKEN_KEY,
  SESSION_EXPIRED_KEY
} from "@app/constant";
import {Router} from "@angular/router";
import {AUTHENTICATION_ENTRY_POINT} from "@app/config";
import {AuthenticationStatus} from "@app/model/enum";
import {hasAtLeastAProperty, isTruthy} from "@app/shared/helper";
import {MiscService} from "@app/shared/service/impl/common";


/**
 * @class AuthenticationService
 * @description
 *   Provides methods for user authentication, sign-up, and related operations.
 */
@Injectable()
export class AuthenticationService {

  /**
   * @property BASE_PATH
   * @description
   *   The base path for authentication-related API endpoints.
   */
  private readonly BASE_PATH: string = "auth";

  /**
   * @property VERIFICATION_BASE_PATH
   * @description
   *   The base path for verification-related API endpoints.
   */
  private readonly VERIFICATION_BASE_PATH: string = "verification";

  /**
   * @constructor
   * @description
   *   Initializes a new instance of the AuthenticationService class.
   *
   * @param httpService - An instance of the HttpClientService for making HTTP requests.
   * @param localStorageService - An instance of the LocalStorageService for handling local storage operations.
   * @param tokenService - An instance of the AuthTokenService for managing authentication tokens.
   * @param miscService - An instance for basic common service and feature like checking if an email exists
   */
  constructor(
    private httpService: HttpClientService,
    private localStorageService: LocalStorageService,
    private tokenService: AuthTokenService,
    private miscService: MiscService
  ) { }

  /**
   * @method isEmailExists
   * @description
   *   Checks if an email address already exists in the system.
   *
   * @param emailAddress - The email address to check for existence.
   * @returns {Observable<EntityExistsResponse>} - An observable emitting an EntityExistsResponse.
   */
  public isEmailExists(emailAddress: string): Observable<EntityExistsResponse> {
    return this.miscService.isEmailExists(emailAddress);
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
    return this.miscService.isPhoneNumberExists(phoneNumber);
  }

  /**
   * @method signUp
   * @description
   *   Initiates a user sign-up process.
   *
   * @param body - The sign-up payload containing user information.
   * @param recaptchaToken - The reCAPTCHA token obtained from the client-side.
   * @returns {Observable<SignUpResponse>} - An observable emitting a SignUpResponse.
   */
  public signUp(body: SignUpPayload, recaptchaToken: string): Observable<SignUpResponse> {
    const headers: AnyObject = this.getRecaptchaHeaders(recaptchaToken)
    const req: BaseRequest = this.httpService.toRequest([this.BASE_PATH, 'sign-up'], null, { ...body }, "POST", headers);
    return this.httpService.post(req, SignUpResponse);
  }

  /**
   * Initiates a user sign-in process.
   *
   * @param body - The sign-in payload containing user credentials.
   * @param recaptchaToken - The reCAPTCHA token obtained from the client-side.
   * @returns An observable emitting a SignInResponse upon successful sign-in.
   *
   * @description
   * This method sends a sign-in request to the server with the provided user credentials
   * and reCAPTCHA token. Upon successful sign-in, it emits a SignInResponse through an observable.
   * If the sign-in request fails due to network issues or other errors, it throws an HttpErrorResponse.
   */
  public signIn(body: SignInPayload, recaptchaToken: string): Observable<SignInResponse> {
    const headers: AnyObject = this.getRecaptchaHeaders(recaptchaToken);
    const req: BaseRequest = this.httpService.toRequest([this.BASE_PATH, 'sign-in'], null, { ...body },  "POST", headers);
    return this.httpService.post(req, SignInResponse);
  }

  /**
   * Signs out the current member.
   * @returns An Observable that emits a FleenResponse object representing the sign-out response.
   */
  public signOut(): Observable<FleenResponse> {
    const req: BaseRequest = this.httpService.toRequest(['member', 'sign-out']);
    return this.httpService.get(req);
  }

  /**
   * @method completeSignUp
   * @description
   *   Completes the user sign-up process with additional verification.
   *
   * @param body - The verification payload.
   * @returns {Observable<SignUpResponse>} - An observable emitting a SignUpResponse.
   */
  public completeSignUp(body: AuthVerificationPayload): Observable<SignUpResponse> {
    const req: BaseRequest = this.httpService.toRequest([this.VERIFICATION_BASE_PATH, 'complete-sign-up'], null, { ...body });
    return this.httpService.post(req, SignUpResponse);
  }

  /**
   * @method validateSignInMfa
   * @description
   *   Validates multifactor authentication during the sign-in process.
   *
   * @param body - The verification payload.
   * @returns {Observable<SignInResponse>} - An observable emitting a SignInResponse.
   */
  public validateSignInMfa(body: AuthVerificationPayload): Observable<SignInResponse> {
    const req: BaseRequest = this.httpService.toRequest([this.VERIFICATION_BASE_PATH, 'validate-sign-in-mfa'], null, { ...body });
    return this.httpService.post(req, SignInResponse);
  }

  /**
   * @method completeOnboarding
   * @description
   *   Completes the onboarding process after initial authentication.
   *
   * @param body - The payload containing additional information.
   * @returns {Observable<SignInResponse>} - An observable emitting a SignInResponse.
   */
  public completeOnboarding(body: ChangePasswordPayload): Observable<SignInResponse> {
    const req: BaseRequest = this.httpService.toRequest([this.VERIFICATION_BASE_PATH, 'complete-onboarding'], null, { ...body });
    return this.httpService.post(req, SignInResponse);
  }

  /**
   * @method resendOtp
   * @description
   *   Resends the verification code for pre-verification.
   *
   * @param body - The payload for resending verification.
   * @returns {Observable<FleenResponse>} - An observable emitting a FleenResponse.
   */
  public resendOtp(body: ResendVerificationCodePayload): Observable<FleenResponse> {
    const req: BaseRequest = this.httpService.toRequest([this.VERIFICATION_BASE_PATH, 'resend-pre-verification-code'], null, { ...body });
    return this.httpService.post(req, FleenResponse);
  }

  /**
   * @method resendPreAuthenticationOtp
   * @description
   *   Resends the pre-authentication verification code.
   *
   * @param body - The payload for resending pre-authentication verification.
   * @returns {Observable<FleenResponse>} - An observable emitting a FleenResponse.
   */
  public resendPreAuthenticationOtp(body: ResendVerificationCodePayload): Observable<FleenResponse> {
    const req: BaseRequest = this.httpService.toRequest([this.VERIFICATION_BASE_PATH, 'resend-pre-authentication-code'], null, { ...body });
    return this.httpService.post(req, FleenResponse);
  }

  /**
   * @method forgotPassword
   * @description
   *   Initiates the password recovery process.
   *
   * @param body - The payload for initiating password recovery.
   * @returns {Observable<ForgotPasswordResponse>} - An observable emitting a ForgotPasswordResponse.
   */
  public forgotPassword(body: ForgotPasswordPayload): Observable<ForgotPasswordResponse> {
    const req: BaseRequest = this.httpService.toRequest([this.BASE_PATH, 'forgot-password'], null, { ...body });
    return this.httpService.post(req, ForgotPasswordResponse);
  }

  /**
   * @method verifyResetPasswordCode
   * @description
   *   Verifies the code sent for resetting the password.
   *
   * @param body - The payload containing the verification code.
   * @returns {Observable<InitiatePasswordChangeResponse>} - An observable emitting an InitiatePasswordChangeResponse.
   */
  public verifyResetPasswordCode(body: ResetPasswordPayload): Observable<InitiatePasswordChangeResponse> {
    const req: BaseRequest = this.httpService.toRequest([this.BASE_PATH, 'verify-reset-password-code'], null, { ...body });
    return this.httpService.post(req, InitiatePasswordChangeResponse);
  }

  public refreshToken(refreshToken: string): Observable<RefreshTokenResponse> {
    const headers: AnyObject = { [AUTHORIZATION_HEADER]: refreshToken };
    const req: BaseRequest = this.httpService.toRequest([this.VERIFICATION_BASE_PATH, 'refresh-token'], null,  {}, 'GET',headers);
    return this.httpService.get(req, RefreshTokenResponse);
  }

  /**
   * @method saveAuthToken
   * @description
   *   Saves the access token to local storage.
   *
   * @param token - The access token to be saved.
   */
  public saveAccessToken(token: string): void {
    this.localStorageService.setObject(ACCESS_TOKEN_KEY, token);
  }

  /**
   * @method saveRefreshToken
   * @description
   *   Saves the refresh token to local storage.
   *
   * @param token - The refresh token to be saved.
   */
  public saveRefreshToken(token: string): void {
    this.localStorageService.setObject(REFRESH_TOKEN_KEY, token);
  }

  /**
   * @method setAuthToken
   * @description
   *   Sets both the access token and refresh token based on the sign-in result.
   *
   * @param result - The sign-in result containing access and refresh tokens.
   */
  public setAuthToken(result: SignInUpResponse): void {
    this.saveAccessToken(result.accessToken || '');
    this.saveRefreshToken(result.refreshToken || '');
  }

  public setSessionExpired(status: boolean = false): void {
    this.localStorageService.setObject(SESSION_EXPIRED_KEY, String(status).toString())
  }

  public clearSession(): void {
    this.localStorageService.removeObject(SESSION_EXPIRED_KEY);
  }

  public isSessionExpired(): boolean {
    const status: string | null = this.localStorageService.getObject(SESSION_EXPIRED_KEY);
    if (isTruthy(status)) {
      return Boolean(status);
    }
    return false;
  }

  /**
   * @method clearAuthTokens
   * @description
   *   Clears both the access token and refresh token from local storage.
   */
  public clearAuthTokens(): void {
    this.saveAccessToken('');
    this.saveRefreshToken('');
  }

  /**
   * @method startAuthentication
   * @description
   *   Redirects to the authentication entry point using the provided router.
   *
   * @param router - The Angular Router service for navigation.
   */
  public startAuthentication(router: Router): void {
    router.navigate([AUTHENTICATION_ENTRY_POINT])
      .then((r: boolean) => r);
  }


  /**
   * @method resetAndChangePassword
   * @description
   *   Resets and changes the user's password.
   *
   * @param body - The payload containing the new password.
   * @returns {Observable<FleenResponse>} - An observable emitting a FleenResponse.
   */
  public resetAndChangePassword(body: ChangePasswordPayload): Observable<FleenResponse> {
    const req: BaseRequest = this.httpService.toRequest([this.VERIFICATION_BASE_PATH, 'reset-change-password'], null, { ...body });
    return this.httpService.post(req, FleenResponse);
  }


  /**
   * @method isAuthenticated
   * @description
   *   Checks if the user is currently authenticated based on the validity of the access token.
   *
   * @returns {boolean} - A boolean indicating whether the user is authenticated.
   */
  public isAuthenticated(): boolean {
    return this.tokenService.isTokenValid(this.tokenService.getAccessToken());
  }

  /**
   * @method isAuthenticationStatusCompleted
   * @description
   *   Checks if the user's authentication status is marked as completed in the JWT claims.
   *
   * @returns {boolean} - A boolean indicating whether the authentication status is completed.
   */
  public isAuthenticationStatusCompleted(): boolean {
    return this.isAuthenticated()
      && this.getJwtClaims() !== null
      && hasAtLeastAProperty(this.getJwtClaims())
      && (this.getJwtClaims()[AUTHENTICATION_STATUS_KEY]) === AuthenticationStatus.COMPLETED;
  }

  /**
   * @private
   * @method getJwtClaims
   * @description
   *   Retrieves the JWT claims (payload) from the access token.
   *
   * @returns {AnyObject} - The JWT claims.
   */
  private getJwtClaims(): AnyObject {
    return this.tokenService.getAccessTokenClaims();
  }

  private getRecaptchaHeaders(recaptchaToken: string): AnyObject {
    return { [RECAPTCHA_TOKEN_HEADER_KEY]: recaptchaToken };
  }
}
