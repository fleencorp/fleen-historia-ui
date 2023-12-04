import {AnyObject} from "../type";

/**
 * @class ErrorResponse
 * @description
 *   Represents an error response received from an HTTP request.
 * @author Yusuf Alamu Musa
 * @version 1.0
 */
export class ErrorResponse {

  /**
   * @property message
   * @description
   *   The error message associated with the response.
   */
  public message!: string;

  /**
   * @property status
   * @description
   *   The HTTP status code associated with the error response.
   */
  public status?: number;

  /**
   * @property timestamp
   * @description
   *   The timestamp indicating when the error response occurred.
   */
  public timestamp?: Date;

  /**
   * @property type
   * @description
   *   The type of error, if provided by the server.
   */
  public type?: string | null;

  /**
   * @property fields
   * @description
   *   Additional fields or details associated with the error response.
   */
  public fields?: AnyObject[];

  /**
   * @property path
   * @description
   *   The path or URI that caused the error, if available.
   */
  public path?: string | null;

  /**
   * @constructor
   * @description
   *   Initializes a new instance of the ErrorResponse class.
   *
   * @param data - The data object containing information about the error response.
   */
  public constructor(data: ErrorResponse) {
    this.message = data?.message ? data?.message : '';
    this.status = data?.status;
    this.type = data?.type ? data?.type : null;
    this.timestamp = (data?.timestamp ? new Date(data?.timestamp) : new Date());
    this.fields = data?.fields ? data?.fields : [];
    this.path = data?.path ? data?.path : null;
  }

}
