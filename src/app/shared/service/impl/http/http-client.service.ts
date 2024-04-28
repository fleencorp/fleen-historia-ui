import {Inject, Injectable} from '@angular/core';
import {LoggerService} from "@app/base/service";
import {BaseRequest, ExchangeRequest} from "@app/model/type";
import {BaseHttpService} from "./base-http.service";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Constructor, HttpServiceConfig} from "@app/model/interface";

/**
 * @class HttpClientService
 * @extends BaseHttpService
 * @description
 *   A service class for making HTTP requests using Angular's HttpClient.
 *
 * @author Yusuf Alamu Musa
 * @version 1.0
 */
@Injectable()
export class HttpClientService extends BaseHttpService {

  /**
   * @constructor
   * @description
   *   Initializes a new instance of the HttpClientService class.
   *
   * @param httpClient - The Angular HttpClient service for making HTTP requests.
   * @param config - The configuration settings for the HTTP service.
   * @param logger - The logger service to be used for logging.
   */
  constructor(
      protected httpClient: HttpClient,
      @Inject('HttpServiceConfig')
        protected override readonly config: HttpServiceConfig,
      logger: LoggerService) {
    super(logger, config);
  }


  /**
   * @method request
   * @description
   *   Makes a generic HTTP request using the provided BaseRequest object.
   *
   * @param req - The BaseRequest object containing information about the request.
   * @param clazz The class constructor used to instantiate a new instance of an object with the data
   * @returns {Observable<any>} - An Observable emitting the response of the HTTP request.
   */
  public request<T extends Object>(req: BaseRequest, clazz?: Constructor<T>): Observable<any> {
    const { body } = req;
    const request: Observable<Object> = this.httpClient.request(req.method as string, this.buildUri(req), { body });
    return this.pipeline(request, clazz);
  }

  /**
   * @method exchange
   * @description
   *   Makes an HTTP request with a different method and URI using the provided ExchangeRequest object.
   *
   * @param req - The ExchangeRequest object containing information about the request.
   * @returns {Observable<any>} - An Observable emitting the response of the HTTP request.
   */
  public exchange(req: ExchangeRequest): Observable<any> {
    return this.httpClient.request(req.method as string, req.uri, { ...req });
  }

  public multipart(req: ExchangeRequest): Observable<any> {
    return this.httpClient.request(req.method as string, req.uri, { ...req, body: req.body.get('0') });
  }

  /**
   * @method get
   * @description
   *   Makes an HTTP GET request using the provided BaseRequest object.
   *
   * @param req - The BaseRequest object containing information about the request.
   * @param clazz The class constructor used to instantiate a new instance of an object with the data
   * @returns {Observable<any>} - An Observable emitting the response of the HTTP request.
   */
  public get<T extends Object>(req: BaseRequest, clazz?: Constructor<T>): Observable<any> {
    const { headers } = req;
    const request: Observable<Object> = this.httpClient.get(this.buildUri(req), { headers });
    return this.pipeline(request, clazz);
  }

  /**
   * @method getOne
   * @description
   *   Alias for the `get` method. Makes an HTTP GET request using the provided BaseRequest object.
   *
   * @param req - The BaseRequest object containing information about the request.
   * @param clazz The class constructor used to instantiate a new instance of an object with the data
   * @returns {Observable<any>} - An Observable emitting the response of the HTTP request.
   */
  public getOne<T extends Object>(req: BaseRequest, clazz?: Constructor<T>): Observable<any> {
    return this.get(req, clazz);
  }

  /**
   * @method post
   * @description
   *   Makes an HTTP POST request using the provided BaseRequest object.
   *
   * @param req - The BaseRequest object containing information about the request.
   * @param clazz The class constructor used to instantiate a new instance of an object with the data
   * @returns {Observable<any>} - An Observable emitting the response of the HTTP request.
   */
  public post<T extends Object>(req: BaseRequest, clazz?: Constructor<T>): Observable<any> {
    const { headers } = req;
    const request: Observable<Object> = this.httpClient.post(this.buildUri(req), req.body, { headers });
    return this.pipeline(request, clazz);
  }

  /**
   * @method saveMany
   * @description
   *   Alias for the `post` method. Makes an HTTP POST request using the provided BaseRequest object.
   *
   * @param req - The BaseRequest object containing information about the request.
   * @param clazz The class constructor used to instantiate a new instance of an object with the data
   * @returns {Observable<any>} - An Observable emitting the response of the HTTP request.
   */
  public saveMany<T extends Object>(req: BaseRequest, clazz?: Constructor<T>): Observable<any> {
    return this.post(req, clazz);
  }

  /**
   * @method update
   * @description
   *   Makes an HTTP PUT request using the provided BaseRequest object.
   *
   * @param req - The BaseRequest object containing information about the request.
   * @param clazz The class constructor used to instantiate a new instance of an object with the data
   * @returns {Observable<any>} - An Observable emitting the response of the HTTP request.
   */
  public update<T extends Object>(req: BaseRequest, clazz?: Constructor<T>): Observable<any> {
    const request: Observable<Object> = this.httpClient.put(this.buildUri(req), req.body);
    return this.pipeline(request, clazz);
  }

  /**
   * @method delete
   * @description
   *   Makes an HTTP DELETE request using the provided BaseRequest object.
   *
   * @param req - The BaseRequest object containing information about the request.
   * @param clazz The class constructor used to instantiate a new instance of an object with the data
   * @returns {Observable<any>} - An Observable emitting the response of the HTTP request.
   */
  public delete<T extends Object>(req: BaseRequest, clazz?: Constructor<T>): Observable<any> {
    const request: Observable<Object> = this.httpClient.delete(this.buildUri(req));
    return this.pipeline(request, clazz);
  }

  /**
   * @method deleteMany
   * @description
   *   Makes an HTTP DELETE request using the provided BaseRequest object (using the `request` method).
   *
   * @param req - The BaseRequest object containing information about the request.
   * @param clazz The class constructor used to instantiate a new instance of an object with the data
   * @returns {Observable<any>} - An Observable emitting the response of the HTTP request.
   */
  public deleteMany<T extends Object>(req: BaseRequest, clazz?: Constructor<T>): Observable<any> {
    req.method = 'DELETE';
    return this.request(req, clazz);
  }

}

