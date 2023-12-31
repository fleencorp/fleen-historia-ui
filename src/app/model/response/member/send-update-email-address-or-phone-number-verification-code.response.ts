export class SendUpdateEmailAddressOrPhoneNumberVerificationCodeResponse {
  public readonly message: string;
  public readonly timestamp: Date | string;

  public constructor(data: SendUpdateEmailAddressOrPhoneNumberVerificationCodeResponse) {
    this.message = data?.message ? data.message : data?.message;
    this.timestamp = data?.timestamp ? data.timestamp : (new Date()).toString();
  }
}
