import {FleenBaseView} from "@app/model/view";

export class GoogleClientCredentialView extends FleenBaseView {
  public readonly credentialId: number;
  public readonly accountName: string;
  public readonly clientId: string;
  public readonly projectId: string;
  public readonly authUri: string;
  public readonly tokenUri: string;
  public readonly authProviderX509CertUrl: string;
  public readonly clientSecret: string;
  public readonly apiKey: string;
  public readonly redirectUris: string;
  public readonly javascriptOrigins: string;

  constructor(data: GoogleClientCredentialView) {
    super(data);
    this.credentialId = data?.credentialId ?? null;
    this.accountName = data?.accountName ?? '';
    this.clientId = data?.clientId ?? '';
    this.projectId = data?.projectId ?? '';
    this.authUri = data?.authUri ?? '';
    this.tokenUri = data?.tokenUri ?? '';
    this.authProviderX509CertUrl = data?.authProviderX509CertUrl ?? '';
    this.clientSecret = data?.clientSecret ?? '';
    this.apiKey = data?.apiKey ?? '';
    this.redirectUris = data?.redirectUris ?? '';
    this.javascriptOrigins = data?.javascriptOrigins ?? '';
  }

  public static empty(): GoogleClientCredentialView {
    return new GoogleClientCredentialView({} as GoogleClientCredentialView);
  }

}

