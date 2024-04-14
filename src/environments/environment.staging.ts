import {AnyObject} from "@app/model/type";

/**
 * @constant API_HOST_URL
 * @description
 *   The base URL for the API in the application.
 */
export const API_HOST_URL: string = "http://dev.fleenhistoria.com";

export const environment: AnyObject = {
  production: false,
  baseUrl: API_HOST_URL
};
