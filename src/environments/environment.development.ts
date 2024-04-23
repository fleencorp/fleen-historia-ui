import {AnyObject} from "@app/model/type";
import {GOOGLE_RECAPTCHA_SITE_KEY} from "@app/constant";

export const API_HOST_URL: string = "http://localhost:7987";

export const environment: AnyObject = {
  production: false,
  baseUrl: API_HOST_URL,
  recaptchaSiteKey: GOOGLE_RECAPTCHA_SITE_KEY
};
