import {HttpServiceConfig} from "../model/interface";


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
 * @constant API_HOST_URL
 * @description
 *   The base URL for the API in the application.
 */
export const API_HOST_URL: string = "http://localhost:9898";


/**
 * @constant API_BASE_PATH
 * @description
 *   The base path for API endpoints in the application.
 */
export const API_BASE_PATH: string = "api";


/**
 * @constant HTTP_REQUEST_RETRY_TIMES
 * @description
 *   The number of times to retry an HTTP request before considering it as failed.
 */
const HTTP_REQUEST_RETRY_TIMES: number = 3;


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
  hostUrl: API_HOST_URL,
  basePath: API_BASE_PATH,
  retryTimes: HTTP_REQUEST_RETRY_TIMES
};

