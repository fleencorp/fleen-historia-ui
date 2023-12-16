import {Injectable} from '@angular/core';
import {HttpClientService} from "@app/shared/service/impl";
import {AuthTokenService, LocalStorageService} from "@app/base/service";
import {map, Observable} from "rxjs";
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
  SignInResponse,
  SignInUpResponse,
  SignUpResponse
} from "@app/model/response/authentication";
import {FleenResponse} from "@app/model/response";
import {ACCESS_TOKEN_KEY, AUTHENTICATION_STATUS_KEY, REFRESH_TOKEN_KEY} from "@app/constant";
import {Router} from "@angular/router";
import {AUTHENTICATION_ENTRY_POINT} from "../../../config";
import {AuthenticationStatus} from "@app/model/enum";
import {hasAtLeastAProperty} from "@app/shared/helper";


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
   */
  constructor(
    private httpService: HttpClientService,
    private localStorageService: LocalStorageService,
    private tokenService: AuthTokenService
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
    const req: BaseRequest = this.httpService.toRequest(['misc', 'email-address', 'exists'], { emailAddress });
    return this.httpService.get(req);
  }

  /**
   * @method signUp
   * @description
   *   Initiates a user sign-up process.
   *
   * @param body - The sign-up payload containing user information.
   * @returns {Observable<SignUpResponse>} - An observable emitting a SignUpResponse.
   */
  public signUp(body: SignUpPayload): Observable<SignUpResponse> {
    const req: BaseRequest = this.httpService.toRequest([this.BASE_PATH, 'sign-up'], null, { ...body });
    return this.httpService.post(req)
      .pipe(
        map(data => new SignUpResponse(data))
      );
  }

  /**
   * @method signIn
   * @description
   *   Initiates a user sign-in process.
   *
   * @param body - The sign-in payload containing user credentials.
   * @returns {Observable<SignInResponse>} - An observable emitting a SignInResponse.
   */
  public signIn(body: SignInPayload): Observable<SignInResponse> {
    const req: BaseRequest = this.httpService.toRequest([this.BASE_PATH, 'sign-in'], null, { ...body });
    return this.httpService.post(req)
      .pipe(
        map(data => new SignInResponse(data))
      );
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
    const req: BaseRequest = this.httpService.toRequest([this.VERIFICATION_BASE_PATH, 'confirm-sign-up'], null, { ...body });
    return this.httpService.post(req)
      .pipe(
        map(data => new SignUpResponse(data))
      );
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
    return this.httpService.post(req)
      .pipe(
        map(data => new SignInResponse(data))
      );
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
    return this.httpService.post(req)
      .pipe(
        map(data => new SignInResponse(data))
      );
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
    return this.httpService.post(req)
      .pipe(
        map(data => new FleenResponse(data))
      );
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
    return this.httpService.post(req)
      .pipe(
        map(data => new FleenResponse(data))
      );
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
    return this.httpService.post(req)
      .pipe(
        map(data => new ForgotPasswordResponse(data))
      );
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
    return this.httpService.post(req)
      .pipe(
        map(data => new InitiatePasswordChangeResponse(data))
      );
  }

// (Other methods omitted for brevity)

  /**
   * @method saveAuthToken
   * @description
   *   Saves the access token to local storage.
   *
   * @param token - The access token to be saved.
   */
  public saveAuthToken(token: string): void {
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
    this.saveAuthToken(result.accessToken || '');
    this.saveRefreshToken(result.refreshToken || '');
  }

  /**
   * @method clearAuthTokens
   * @description
   *   Clears both the access token and refresh token from local storage.
   */
  public clearAuthTokens(): void {
    this.saveAuthToken('');
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
    return this.httpService.post(req)
      .pipe(
        map(data => new FleenResponse(data))
      );
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
}
