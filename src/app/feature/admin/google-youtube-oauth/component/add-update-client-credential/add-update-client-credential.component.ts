import {Component, EventEmitter, Input, Output} from '@angular/core';
import {AbstractControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-add-update-client-credential',
  templateUrl: './add-update-client-credential.component.html',
  styleUrl: './add-update-client-credential.component.css'
})
export class AddUpdateClientCredentialComponent {

  @Input('client-credential-form') public clientCredentialForm!: FormGroup;
  @Input('is-form-completed') public isFormCompleted: boolean = false;
  @Input('is-form-ready') public isFormReady: boolean = false;
  @Input('is-loading') public isLoading: boolean = false;
  @Input('is-submitting') public isSubmitting: boolean = false
  @Input('status-message') public statusMessage: string = '';
  @Input('error-message') public errorMessage: string = '';

  @Output('add-update') addUpdateClientCredential$: EventEmitter<any> = new EventEmitter<any>();

  public addUpdateClientCredential(): void {
    this.addUpdateClientCredential$.emit();
  }

  get fleenForm(): FormGroup {
    return this.clientCredentialForm;
  }

  get accountName(): AbstractControl | null | undefined {
    return this.fleenForm?.get('accountName');
  }

  get clientId(): AbstractControl | null | undefined {
    return this.fleenForm?.get('clientId');
  }

  get projectId(): AbstractControl | null | undefined {
    return this.fleenForm?.get('projectId');
  }

  get authUri(): AbstractControl | null | undefined {
    return this.fleenForm?.get('authUri');
  }

  get tokenUri(): AbstractControl | null | undefined {
    return this.fleenForm?.get('tokenUri');
  }

  get authProviderX509CertUrl(): AbstractControl | null | undefined {
    return this.fleenForm?.get('authProviderX509CertUrl');
  }

  get clientSecret(): AbstractControl | null | undefined {
    return this.fleenForm?.get('clientSecret');
  }

  get apiKey(): AbstractControl | null | undefined {
    return this.fleenForm?.get('apiKey');
  }

  get redirectUris(): AbstractControl | null | undefined {
    return this.fleenForm?.get('redirectUris');
  }

  get javascriptOrigins(): AbstractControl | null | undefined {
    return this.fleenForm?.get('javascriptOrigins');
  }

}
