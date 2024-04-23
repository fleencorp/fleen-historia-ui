import {AnyObject} from "@app/model/type";
import {GOOGLE_RECAPTCHA_SITE_KEY} from "@app/constant";

/**
 * @constant API_HOST_URL
 * @description
 *   The base URL for the API in the application.
 */
export const API_HOST_URL: string = "http://dev.fleenhistoria.com";

export const environment: AnyObject = {
  production: false,
  baseUrl: API_HOST_URL,
  recaptchaSiteKey: GOOGLE_RECAPTCHA_SITE_KEY
};
