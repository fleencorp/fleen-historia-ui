import {AnyObject, FeatureState} from "@app/model/type/base.type";
import {FormBuilder, FormGroup} from "@angular/forms";
import {ChannelView} from "@app/model/view/channel";

export type AddGoogleClientCredentialPayload = {
  accountName: string;
  clientId: string;
  projectId: string;
  authUri: string;
  tokenUri: string;
  authProviderX509CertUrl: string;
  clientSecret: string;
  apiKey: string;
  redirectUris: string[];
  javascriptOrigins: string[];
};

export type UpdateGoogleClientCredentialPayload = AddGoogleClientCredentialPayload;

export interface ChannelState extends FeatureState {
  form: FormGroup;
  initForm: (channel: ChannelView, formBuilder: FormBuilder) => void;
  formBuilder: AnyObject;
}

export interface ChannelStateMap {
  [channelId: string]: ChannelState;
}
