import {AnyArray, AnyObject, BaseRequest, RequestMethod} from "@app/model/type";
import {isObject, isTruthy, joinPaths, toBody, toCamelCaseKeys, toSnakeCasePayload} from "@app/shared/helper";
import {catchError, map, Observable, retry, switchMap, tap, throwError, timer} from "rxjs";
import {ErrorResponse} from "@app/model/response";
import {LoggerService} from "@app/base/service";
import {Constructor, HttpServiceConfig} from "@app/model/interface";
import {Inject, Injectable} from "@angular/core";
import {toModel} from "@app/shared/rxjs";


/**
 * @class BaseHttpService
 * @description
 *   A base class providing common functionality for HTTP services.
 *
 * @author Yusuf Alamu Musa
 * @version 1.0
 */
@Injectable()
export class BaseHttpService {

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
    return joinPaths(parameters);
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
    if ('error' in error) {
      error = error.error;
    }
    return throwError(() => new ErrorResponse(error));
  }

  /**
   * @method pipeline
   * @description
   *   Applies a set of operations to an Observable source, including retrying, logging, mapping keys, and error handling.
   *
   * @param source - The source Observable to apply the pipeline operations.
   * @param clazz The class constructor used to instantiate a new instance of an object with the data
   * @returns {Observable} - The resulting Observable after applying the pipeline.
   */
  protected pipeline<T extends Object>(source: Observable<T>, clazz?: Constructor<T>): Observable<T> {
    return timer(this.config.delayRequestTime).pipe(
      switchMap(() => source.pipe(
          retry(this.config.retryTimes),
          tap(() => this.logger.log),
          map((res: T) => toCamelCaseKeys(res)),
          toModel(clazz),
          catchError(this.handleError)
        )
      )
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
  public toRequest(pathParams: AnyArray, queryParams?: AnyObject | null, bodyOrMethod?: AnyObject | RequestMethod, method?: RequestMethod, headers?: {}): BaseRequest {
    if (typeof bodyOrMethod === 'string') {
      return {
        pathParams,
        queryParams: toSnakeCasePayload(queryParams),
        method: isTruthy(method) ? method : bodyOrMethod,
        headers
      };
    } else {
      return {
        pathParams,
        queryParams: toSnakeCasePayload(queryParams),
        body: toBody(bodyOrMethod),
        method: isTruthy(method) ? method : 'GET',
        headers
      };
    }
  }

  /**
   * @method toRequestV2
   * @description
   *   Constructs a BaseRequest object from various input parameters for making HTTP requests.
   *
   * @param pathParams - The path parameters for the request.
   * @param queryParams - The query parameters for the request.
   * @param bodyOrMethod - The request body or the HTTP method for the request.
   * @param method - The HTTP method for the request (used only when bodyOrMethod is not a string).
   * @returns {BaseRequest} - The constructed BaseRequest object.
   */
  public toRequestV2(pathParams: AnyArray, queryParams?: AnyObject | null, bodyOrMethod?: AnyObject | RequestMethod, method?: RequestMethod): BaseRequest {
    const request: BaseRequest = this.toRequest(pathParams, queryParams, bodyOrMethod, method);
    request.queryParams = queryParams as AnyObject;
    return request;
  }

}
