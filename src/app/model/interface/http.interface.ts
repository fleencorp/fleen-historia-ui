
/**
 * @interface HttpServiceConfig
 * @description
 *   Configuration settings for the HTTP service in the application.
 *
 * @property {string} hostUrl - The base URL for the HTTP service.
 * @property {string} basePath - The base path for API endpoints in the HTTP service.
 * @property {number} retryTimes - The number of times to retry an HTTP request before considering it as failed.
 * @property {number} delayRequestTime - The delay time, in milliseconds, before initiating an HTTP request.
 */
export interface HttpServiceConfig {
  hostUrl: string;
  basePath: string;
  retryTimes: number;
  delayRequestTime: number;
}
