/**
 * Header key used to specify the content type in HTTP requests.
 */
export const CONTENT_TYPE_HEADER_KEY: string = 'Content-Type';

/**
 * Header key used for authorization in HTTP requests.
 */
export const AUTHORIZATION_HEADER: string = 'Authorization';

/**
 * Prefix for the Authorization Bearer token.
 */
export const AUTHORIZATION_BEARER: string = 'Bearer {}';

/**
 * Key used for storing the access token in local storage or session storage.
 */
export const ACCESS_TOKEN_KEY: string = 'ACCESS_TOKEN';

/**
 * Key used for storing the refresh token in local storage or session storage.
 */
export const REFRESH_TOKEN_KEY: string = 'REFRESH_TOKEN';

/**
 * Header key used to indicate a cancel request in HTTP requests.
 */
export const X_CANCEL_REQUEST_HEADER_KEY: string = 'X-Cancel-Request';

/**
 * Constant defining the header key for reCAPTCHA token.
 * This key is typically used to extract the reCAPTCHA token from HTTP request headers.
 * Example usage: request.headers[RECAPTCHA_TOKEN_HEADER_KEY]
 */
export const RECAPTCHA_TOKEN_HEADER_KEY: string = 'recaptcha-token';

export const SESSION_EXPIRED_KEY: string = 'SESSION_EXPIRED';
