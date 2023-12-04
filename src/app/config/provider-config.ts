import {httpServiceConfig} from "./base-config";
import {DependencyProvider} from "../model/type";

/**
 * @constant HttpServiceConfig
 * @description
 *   Dependency provider for the configuration settings of the HTTP service in the application.
 *
 * @property {string} provide - The key used to provide the HTTP service configuration in the application's dependency injection.
 * @property {object} useValue - The actual configuration settings provided as a value.
 */
export const HttpServiceConfig: DependencyProvider = {
  provide: 'HttpServiceConfig',
  useValue: httpServiceConfig,
};

