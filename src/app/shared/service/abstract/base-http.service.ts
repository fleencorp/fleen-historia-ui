import {AnyArray, AnyObject, BaseRequest, RequestMethod} from "../../../model/type";
import {isObject, isTruthy, toBody, toCamelCaseKeys, toSnakeCase} from "../../helper";
import {catchError, map, Observable, retry, tap, throwError} from "rxjs";
import {ErrorResponse} from "../../../model/response";
import {LoggerService} from "../../../base/service";
import {HttpServiceConfig} from "../../../model/interface";
import {Inject} from "@angular/core";


/**
 * @class BaseHttpService
 * @description
 *   An abstract base class providing common functionality for HTTP services.
 *
 * @author Yusuf Alamu Musa
 * @version 1.0
 */
export abstract class BaseHttpService {

  /**
   * @constructor
   * @param logger - The logger service to be used for logging.
   * @param config - The configuration settings for the HTTP service.
   */
  public constructor(
    private readonly logger: LoggerService,
    @Inject('HttpServiceConfig') protected readonly config: HttpServiceConfig
  ) { }

  /**
   * @method getPath
   * @description
   *   Constructs a path from an array of parameters by joining them with '/'.
   *
   * @param parameters - An array of parameters to be joined into a path.
   * @returns {string} - The constructed path.
   */
  protected getPath(parameters?: any[]): string {
    return parameters?.join('/') || '';
  }

  /**
   * @method getQueryString
   * @description
   *   Constructs a query string from a set of parameters.
   *
   * @param params - The parameters to be included in the query string.
   * @returns {string} - The constructed query string.
   */
  protected getQueryString(params?: Record<string, any>): string {
    return isObject(params)
      ? '?'.concat((new URLSearchParams(params).toString())) : '';
  }

  /**
   * @method buildUri
   * @description
   *   Builds a complete URI by combining the base URI, path, and query string from a BaseRequest object.
   *
   * @param req - The BaseRequest object containing path parameters and query parameters.
   * @returns {string} - The complete URI.
   */
  protected buildUri(req: BaseRequest): string {
    return `${this.baseUri}/${this.getPath(req.pathParams)}${this.getQueryString(req.queryParams)}`;
  }

  /**
   * @method buildPathUri
   * @description
   *   Builds a complete URI using only a path and the base URI.
   *
   * @param path - The path to be appended to the base URI.
   * @returns {string} - The complete URI.
   */
  public buildPathUri(path: string): string {
    return this.buildUri({ pathParams: [path] });
  }

  /**
   * @property baseUri
   * @description
   *   The base URI for the HTTP service, constructed from the host URL and base path.
   */
  get baseUri(): string {
    return `${this.config.hostUrl}/${this.config.basePath}`;
  }

  /**
   * @method handleError
   * @description
   *   Handles errors by wrapping them in an Observable of ErrorResponse type.
   *
   * @param error - The error object to be handled.
   * @returns {Observable<any>} - An Observable emitting the ErrorResponse for the given error.
   */
  public handleError(error: any): Observable<any> {
    return throwError(() => new ErrorResponse(error));
  }

  /**
   * @method pipeline
   * @description
   *   Applies a set of operations to an Observable source, including retrying, logging, mapping keys, and error handling.
   *
   * @param source - The source Observable to apply the pipeline operations.
   * @returns {Observable<T>} - The resulting Observable after applying the pipeline.
   */
  protected pipeline<T>(source: Observable<T>): Observable<T> {
    return source.pipe(
      retry(this.config.retryTimes),
      tap(() => this.logger.log),
      map((res: T) => toCamelCaseKeys(res)),
      catchError(this.handleError)
    );
  }

  /**
   * @method toRequest
   * @description
   *   Constructs a BaseRequest object from various input parameters for making HTTP requests.
   *
   * @param pathParams - The path parameters for the request.
   * @param queryParams - The query parameters for the request.
   * @param bodyOrMethod - The request body or the HTTP method for the request.
   * @param method - The HTTP method for the request (used only when bodyOrMethod is not a string).
   * @returns {BaseRequest} - The constructed BaseRequest object.
   */
  public toRequest(pathParams: AnyArray, queryParams?: AnyObject | null, bodyOrMethod?: AnyObject | RequestMethod, method?: RequestMethod): BaseRequest {
    if (typeof bodyOrMethod === 'string') {
      return {
        pathParams,
        queryParams: toSnakeCase(queryParams),
        method: isTruthy(method) ? method : bodyOrMethod,
      };
    } else {
      return {
        pathParams,
        queryParams: toSnakeCase(queryParams),
        body: toBody(bodyOrMethod),
        method: isTruthy(method) ? method : 'GET',
      };
    }
  }

}
