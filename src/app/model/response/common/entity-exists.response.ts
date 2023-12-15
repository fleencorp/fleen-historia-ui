/**
 * @class EntityExistsResponse
 * @description
 *   Represents a response indicating the existence of an entity.
 */
export class EntityExistsResponse {

  /**
   * @property exists
   * @description
   *   A boolean indicating whether the entity exists or not.
   */
  public exists: boolean = false;

  /**
   * @property timestamp
   * @description
   *   The timestamp indicating when the response was generated.
   */
  public timestamp: Date;

  /**
   * @property statusCode
   * @description
   *   The HTTP status code associated with the response.
   */
  public statusCode: number;

  /**
   * @constructor
   * @description
   *   Initializes a new instance of the EntityExistsResponse class.
   *
   * @param data - The data object containing information about the entity existence response.
   */
  public constructor(data: EntityExistsResponse) {
    this.exists = data?.exists;
    this.timestamp = data?.timestamp ? new Date(data.timestamp) : new Date();
    this.statusCode = data?.statusCode;
  }
}
