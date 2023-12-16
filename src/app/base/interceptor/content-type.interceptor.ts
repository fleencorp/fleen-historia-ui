import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {isFalsy} from "@app/shared/helper";
import {CONTENT_TYPE_APPLICATION_JSON, CONTENT_TYPE_HEADER_KEY, SUPPORTED_CONTENT_TYPES} from "@app/constant";
import {AnyObject} from "@app/model/type";


/**
 * Interceptor to set the default content type header if not provided in the request.
 *
 * Implements the HttpInterceptor interface to intercept HTTP requests and modify them.
 *
 * @public
 */
@Injectable()
export class ContentTypeInterceptor implements HttpInterceptor {

  /**
   * Intercepts the HTTP request and sets the default content type header if not provided.
   *
   * @param {HttpRequest<any>} request - The HTTP request to be intercepted.
   * @param {HttpHandler} next - The next HTTP handler in the chain.
   * @returns {Observable<HttpEvent<any>>} An observable of the HTTP event stream.
   * @public
   */
  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (isFalsy(this.isContentTypeSupported(request))) {
      request = request.clone({ setHeaders: this.getDefaultContentTypeHeader() });
    }
    return next.handle(request);
  }

  /**
   * Gets the default content type header.
   *
   * @returns {AnyObject} An object containing the default content type header.
   * @private
   */
  private getDefaultContentTypeHeader(): AnyObject {
    return { [CONTENT_TYPE_HEADER_KEY]: CONTENT_TYPE_APPLICATION_JSON };
  }

  /**
   * Checks if the content type in the request is supported.
   *
   * @param {HttpRequest<any>} req - The HTTP request.
   * @returns {boolean} True if the content type is supported; otherwise, false.
   * @private
   */
  private isContentTypeSupported(req: HttpRequest<any>): boolean {
    return SUPPORTED_CONTENT_TYPES.includes(this.getContentTypeHeaders(req));
  }

  /**
   * Gets the content type headers from the request.
   *
   * @param {HttpRequest<any>} request - The HTTP request.
   * @returns {string} The content type headers.
   * @private
   */
  private getContentTypeHeaders(request: HttpRequest<any>): string {
    return <string>request.headers.get(CONTENT_TYPE_HEADER_KEY);
  }
}
