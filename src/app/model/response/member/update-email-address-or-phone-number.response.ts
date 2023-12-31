export class UpdateEmailAddressOrPhoneNumberResponse {

  public emailAddress: string;
  public phoneNumber: string;
  public message: string;
  public timestamp: Date | string;
  public statusCode: number;

  public constructor(data: UpdateEmailAddressOrPhoneNumberResponse) {
    this.emailAddress = data?.emailAddress ? data.emailAddress : data?.emailAddress;
    this.phoneNumber = data?.phoneNumber ? data.phoneNumber : data?.phoneNumber;
    this.message = data?.message ? data.message : data?.message;
    this.timestamp = data?.timestamp ? data.timestamp : (new Date()).toString();
    this.statusCode = data?.statusCode ? data.statusCode : data?.statusCode;
  }
}
