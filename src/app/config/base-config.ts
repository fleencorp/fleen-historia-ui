import {HttpServiceConfig} from "../model/interface";
import {environment} from "@app/environment";


/**
 * @constant BASE_PATH
 * @description
 *   The base path used in the application.
 */
const BASE_PATH: string = '/';


/**
 * @constant AUTHENTICATION_ENTRY_POINT
 * @description
 *   The entry point for authentication in the application.
 */
export const AUTHENTICATION_ENTRY_POINT: string = '/auth/sign-in';

/**
 * @constant API_BASE_PATH
 * @description
 *   The base path for API endpoints in the application.
 */
export const API_BASE_PATH: string = "api";

export const FORBIDDEN_ROUTE: string = '/forbidden';

/**
 * @constant HTTP_REQUEST_RETRY_TIMES
 * @description
 *   The number of times to retry an HTTP request before considering it as failed.
 */
const HTTP_REQUEST_RETRY_TIMES: number = 1;


/**
 * @constant HTTP_REQUEST_DELAY_TIME
 * @description
 *   The delay time for HTTP requests in milliseconds.
 *   Represents the time interval before initiating an HTTP request.
 *   Example: 10_000 milliseconds is equivalent to 10 seconds or 10_000 / 1000
 */
const HTTP_REQUEST_DELAY_TIME_IN_MILLISECONDS: number = 3000;


/**
 * @constant httpServiceConfig
 * @description
 *   Configuration settings for the HTTP service in the application.
 *
 * @property {string} hostUrl - The base URL for the HTTP service.
 * @property {string} basePath - The base path for API endpoints in the HTTP service.
 * @property {number} retryTimes - The number of times to retry an HTTP request before considering it as failed.
 */
export const httpServiceConfig: HttpServiceConfig = {
  hostUrl: environment['baseUrl'],
  basePath: API_BASE_PATH,
  retryTimes: HTTP_REQUEST_RETRY_TIMES,
  delayRequestTime: HTTP_REQUEST_DELAY_TIME_IN_MILLISECONDS
};

