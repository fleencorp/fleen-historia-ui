import {AbstractControl, FormBuilder, FormGroup} from "@angular/forms";
import {convertToDesiredFormat, equalsIgnoreCase, isObject, isTruthy, toCamelCase} from "@app/shared/helper";
import {Router} from "@angular/router";
import {Observable, of} from "rxjs";
import {BaseComponent} from "@app/base/component";
import {AnyObject} from "@app/model/type";
import {ErrorResponse} from "@app/model/response";
import {ErrorType} from "@app/model/enum";
import {ANY_EMPTY, DEFAULT_ERROR_MESSAGE, ERR_CONNECTION_REFUSED_MESSAGE} from "@app/constant";
import {BASE_PATH} from "@app/constant/config.const";

export abstract class BaseFormComponent extends BaseComponent {

  public statusMessage: string = ''
  protected fleenForm: FormGroup = new FormGroup<any>({});
  private readonly ERROR_FIELD_NAME: string = "field_name";
  private readonly ERROR_MESSAGES_NAME: string = "errors";
  public isSubmitting: boolean = false;
  protected abstract formBuilder: FormBuilder;
  public isFormReady: boolean = false;

  protected abstract getRouter(): Router;

  private getAllPropertyKeys(obj: any): string[] {
    const keys: string[] = [];
    if (isObject(obj)) {
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          keys.push(key);

          if (isObject(obj) && obj[key] !== null) {
            keys.push(...(this.getAllPropertyKeys(obj[key])));
          }
        }
      }
    }
    return keys;
  }

  protected setErrorsFromApiResponse(errors: AnyObject[] | any): void {
    if (isTruthy(errors) && Array.isArray(errors)) {
      errors.forEach((error): void => {
        this.setControlError(this.fleenForm, error[this.ERROR_FIELD_NAME], this.getMessagesInSentence(error[this.ERROR_MESSAGES_NAME]));
      });
      this.fleenForm.markAsTouched();
    }
  }

  protected setExternalFormErrorsFromApiResponse(errors: AnyObject[], form: FormGroup): void {
    if (isTruthy(errors) && Array.isArray(errors)) {
      errors.forEach((error): void => {
        this.setControlError(form, error[this.ERROR_FIELD_NAME], this.getMessagesInSentence(error[this.ERROR_MESSAGES_NAME]));
      });
      form.markAsTouched();
    }
  }

  protected setControlError(value: FormGroup | AbstractControl | any[] | any, fieldName: string, errorMessage: string): void {
    const control: AbstractControl | any = value.get(fieldName) || value.get(toCamelCase(fieldName));
    if (value instanceof FormGroup) {
      this.setFieldError(control, errorMessage, convertToDesiredFormat(fieldName));
    } else if (Array.isArray(value)) {
      value.forEach((subGroup): void => {
        this.setControlError(subGroup, fieldName, errorMessage);
      });
    } else if (value instanceof AbstractControl) {
      this.setFieldError(control, errorMessage, convertToDesiredFormat(fieldName));
      if (value instanceof FormGroup) {
        Object.keys(value.controls).forEach((key): void => {
          this.setControlError(value.get(key), fieldName, errorMessage);
        });
      }
    } else if (isObject(value) && Array.isArray(value)) {
      for (const key in (<any>value)) {
        if (value.hasOwnProperty(key) && isObject(value[key])) {
          this.setControlError(value[key], fieldName, errorMessage);
        }
      }
    }
  }

  protected getMessagesInSentence(messages: string[]): string {
    if (isTruthy(messages) && Array.isArray(messages)) {
      if (messages.length < 2) {
        return messages[0];
      }
      return messages.join('. ') + '.';
    }
    return '';
  }

  protected setFieldError(control: any, errorMessage, fieldName): void {
    if (isTruthy(control)) {
      control.setErrors({ fieldError: errorMessage, labelName: convertToDesiredFormat(fieldName) });
      control.markAsTouched();
    }
  }

  protected disableSubmitting(): void {
    this.isSubmitting = true;
  }

  protected enableSubmitting(): void {
    this.isSubmitting = false;
  }

  protected disableSubmittingAndResetErrorMessage(): void {
    this.disableSubmitting();
    this.resetErrorMessage();
  }

  protected override handleError(error: ErrorResponse): void {
    const { type } = error;
    if (isTruthy(type) && equalsIgnoreCase(type, ErrorType.DATA_VALIDATION)) {
      this.setErrorsFromApiResponse(error.fields);
    } else {
      this.setErrorMessage(error?.message);
    }
    this.enableSubmitting();
  }

  protected stopEvent(evt: Event): void {
    evt.preventDefault();
    evt.stopPropagation();
  }

  public resetErrorMessage(): void {
    this.errorMessage = '';
  }

  public setErrorMessage(message: string): void {
    this.errorMessage = message || '';
    if (this.errorMessage.includes(ERR_CONNECTION_REFUSED_MESSAGE)) {
      this.errorMessage = DEFAULT_ERROR_MESSAGE;
    }
  }

  protected setStatusMessage(message: string): void {
    this.statusMessage = message;
  }

  public formReady(): void {
    this.isFormReady = true;
  }

  protected async goToEntries(errorMessage?: string | null, urlSegmentToRemove: number = 2): Promise<void> {
    const currentUrlSegments: string[] = this.getRouter().url.split('/');
    for (let index: number = 0; index < urlSegmentToRemove; index++) {
      currentUrlSegments.pop();
      currentUrlSegments.pop();
    }

    const newRoute: string = [...currentUrlSegments, 'entries'].join('/');
    await this.getRouter().navigate([newRoute], { state: { error: errorMessage ? errorMessage : '' } })
      .then((m: boolean) => m);
  }

  protected async goHome(): Promise<void> {
    await this.getRouter().navigate([BASE_PATH]);
  }

  get noOpFunction(): (...data: any[]) => void {
    return (): void => { };
  }

  public noOpFunction$(...data: any[]): Observable<any> {
    return of(ANY_EMPTY);
  }

}
