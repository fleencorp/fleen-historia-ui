export class YouTubeApiStartAuthenticationResponse {

  public readonly authorizationUri: string;

  public constructor(data: YouTubeApiStartAuthenticationResponse) {
    this.authorizationUri = data?.authorizationUri;
  }
}

export class YouTubeApiAfterAuthenticationResponse {

  public readonly idToken: string;
  public readonly accessToken: string;
  public readonly refreshToken: string;
  public readonly tokenType: string;
  public readonly accessTokenExpirationTimeInSeconds: number;

  public constructor(data: YouTubeApiAfterAuthenticationResponse) {
    this.idToken = data?.idToken;
    this.accessToken = data?.accessToken;
    this.refreshToken = data?.refreshToken;
    this.tokenType = data?.tokenType;
    this.accessTokenExpirationTimeInSeconds = data?.accessTokenExpirationTimeInSeconds;
  }
}
