/**
 * @class CountAllResponse
 * @description
 *   Represents a response object containing a total count.
 */
export class CountAllResponse {

  /**
   * @property total
   * @description
   *   The total count.
   */
  public total!: number;

  /**
   * @constructor
   * @description
   *   Initializes a new instance of the CountAllResponse class.
   *
   * @param data - The data object containing the total count.
   */
  public constructor(data: CountAllResponse) {
    this.total = data?.total ?? 0;
  }
}

/**
 * @class DeleteResponse
 * @description
 *   Represents a response object for delete operations.
 */
export class DeleteResponse {

  /**
   * @property message
   * @description
   *   The message indicating the result of the delete operation.
   */
  public message: string;

  /**
   * @property timestamp
   * @description
   *   The timestamp of the delete operation.
   */
  public timestamp: Date;

  /**
   * @property statusCode
   * @description
   *   The status code of the delete operation.
   */
  public statusCode: number;

  /**
   * @constructor
   * @description
   *   Initializes a new instance of the DeleteResponse class.
   *
   * @param data - The data object containing information about the delete operation.
   */
  public constructor(data: DeleteResponse) {
    this.message = data?.message ?? '';
    this.timestamp = data?.timestamp ?? new Date();
    this.statusCode = data?.statusCode ?? 0;
  }
}

/**
 * @class AwsSignedUrlResponse
 * @description
 *   Represents a response object containing a signed URL.
 */
export class AwsSignedUrlResponse {
  /**
   * @property signedUrl
   * @description
   *   The signed URL.
   */
  public signedUrl: string;

  /**
   * @constructor
   * @description
   *   Initializes a new instance of the AwsSignedUrlResponse class.
   *
   * @param data - The data object containing the signed URL.
   */
  public constructor(data: AwsSignedUrlResponse) {
    this.signedUrl = data?.signedUrl ? data.signedUrl : data?.signedUrl;
  }
}
