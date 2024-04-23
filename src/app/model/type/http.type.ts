import {HttpHeaders} from "@angular/common/http";
import {Observable, Subject} from "rxjs";
import {AnyObject} from "@app/model/type/base.type";

/**
 * @type RequestMethod
 * @description
 *   Represents the HTTP request methods.
 *   - `GET`: GET method.
 *   - `POST`: POST method.
 *   - `DELETE`: DELETE method.
 *   - `PUT`: PUT method.
 *   - `PATCH`: PATCH method.
 *   - `HEAD`: HEAD method.
 *   - `TRACE`: TRACE method.
 */
export type RequestMethod = 'GET' | 'POST' | 'DELETE' | 'PUT' | 'PATCH' | 'HEAD' | 'TRACE';



/**
 * @type BaseRequest
 * @description
 *   Represents the basic structure of an HTTP request.
 *   - `pathParams`: Array of path parameters.
 *   - `queryParams`: Object representing query parameters.
 *   - `body`: Request body.
 *   - `method`: HTTP request method.
 */
export type BaseRequest = {
  pathParams?: (string | number | boolean | object | any)[],
  queryParams?: { [key: string]: any } | undefined,
  body?: any,
  method?: RequestMethod,
  headers?: AnyObject
};


/**
 * @type ExchangeRequest
 * @description
 *   Represents an extended structure for HTTP requests, including URI, headers, and additional options.
 *   - `uri`: The URI for the request.
 *   - `method`: HTTP request method.
 *   - `pathParams`: Array of path parameters.
 *   - `queryParams`: Object representing query parameters.
 *   - `body`: Request body.
 *   - `headers`: HTTP headers.
 *   - `reportProgress`: Whether to report progress.
 *   - `observe`: Type of response to observe.
 */
export type ExchangeRequest = {
  uri: string,
  method?: RequestMethod,
  pathParams?: (string | number | boolean | object | any)[],
  queryParams?: { [key: string]: any } | undefined,
  body?: any,
  headers?: HttpHeaders | any,
  reportProgress?: boolean,
  observe?: string | any,
};


/**
 * @type FileUploadRequest
 * @description
 *   Represents a structure for handling file upload requests.
 *   - `request`: Observable representing the upload request.
 *   - `abort`: Subject for aborting the upload.
 */
export type FileUploadRequest = {
  request: Observable<any>,
  abort: Subject<void>,
};
