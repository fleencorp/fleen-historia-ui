import {maxLength, minLength, required, urlListValidator, urlValid} from "@app/shared/validator";
import {Injectable} from "@angular/core";
import {FormBuilder, FormGroup} from "@angular/forms";
import {GoogleClientCredentialView} from "@app/model/youtube/oauth";


@Injectable()
export class BaseCreateUpdateGoogleClientCredentialService {

  public constructor(protected formBuilder: FormBuilder) {}

  public createForm(data: GoogleClientCredentialView): FormGroup {
    return this.formBuilder.group({

      accountName: [data.accountName, [required, minLength(1), maxLength(1000)]],

      clientId: [data.clientId, [required, minLength(1), maxLength(1000)]],

      projectId: [data.projectId, [required, minLength(1), maxLength(1000)]],

      authUri: [data.authUri, [required, minLength(1), maxLength(1000), urlValid()]],

      tokenUri: [data.tokenUri, [required, minLength(1), maxLength(1000), urlValid()]],

      authProviderX509CertUrl: [data.authProviderX509CertUrl, [required, minLength(1), maxLength(1000), urlValid()]],

      clientSecret: [data.clientSecret, [required, minLength(1), maxLength(1000)]],

      apiKey: [data.apiKey, [required, minLength(1), maxLength(1000)]],

      redirectUris: [data.redirectUris, [required, minLength(1), maxLength(1000), urlListValidator]],

      javascriptOrigins: [data.javascriptOrigins, [required, minLength(1), maxLength(1000), urlListValidator]]
    });
  }
}
