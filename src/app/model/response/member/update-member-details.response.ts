
export class UpdateMemberDetailsResponse {

  public readonly firstName: string;
  public readonly lastName: string;
  public readonly message: string;
  public readonly statusCode: string;
  public readonly timestamp: string;

  public constructor(data: UpdateMemberDetailsResponse) {
    this.firstName = data?.firstName ? data.firstName : data?.firstName;
    this.lastName = data?.lastName ? data.lastName : data?.lastName;
    this.message = data?.message ? data.message : data?.message;
    this.statusCode = data?.statusCode ? data.statusCode : data?.statusCode;
    this.timestamp = data?.timestamp ? data.timestamp : (new Date()).toString();
  }
}
