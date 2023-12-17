import {AuthenticationStatus, AuthenticationStage} from "../../enum";

export class SignInUpResponse {

  public accessToken: string;
  public refreshToken: string;
  public emailAddress: string;
  public phoneNumber: string;
  public authenticationStatus: AuthenticationStatus;
  public authenticationStage: AuthenticationStage;

  public constructor(data: SignInUpResponse) {
    this.accessToken = data?.accessToken;
    this.refreshToken = data?.refreshToken;
    this.emailAddress = data?.emailAddress;
    this.phoneNumber = data?.phoneNumber;
    this.authenticationStatus = data?.authenticationStatus;
    this.authenticationStage = data?.authenticationStage;
  }
}
