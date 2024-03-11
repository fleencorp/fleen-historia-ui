export class GetEncodedPasswordResponse {

  private readonly encodedPassword: string;
  private readonly rawPassword: string;

  public constructor(data: GetEncodedPasswordResponse) {
    this.encodedPassword = data?.encodedPassword;
    this.rawPassword = data?.rawPassword;
  }
}
