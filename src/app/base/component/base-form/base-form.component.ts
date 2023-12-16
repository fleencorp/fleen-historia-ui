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

  /**
   * Disables submitting by setting the `isSubmitting` property to `true`.
   *
   * Marks the component as submitting, preventing further form submissions.
   *
   * @protected
   */
  protected disableSubmitting(): void {
    this.isSubmitting = true;
  }

  /**
   * Enables submitting by setting the `isSubmitting` property to `false`.
   *
   * Allows the component to accept form submissions.
   *
   * @protected
   */
  protected enableSubmitting(): void {
    this.isSubmitting = false;
  }

  /**
   * Disables submitting and resets the error message.
   *
   * Calls `disableSubmitting` and `resetErrorMessage` methods to both disable submitting and clear any existing error messages.
   *
   * @protected
   */
  protected disableSubmittingAndResetErrorMessage(): void {
    this.disableSubmitting();
    this.resetErrorMessage();
  }

  /**
   * Handles errors by setting the appropriate error message or handling data validation errors.
   *
   * If the error type is DATA_VALIDATION, it sets errors from the API response fields; otherwise, it sets the error message from the error object.
   * Finally, it enables submitting after handling the error.
   *
   * @param {ErrorResponse} error - The error object to be handled.
   * @protected
   */
  protected override handleError(error: ErrorResponse): void {
    const { type } = error;

    // Check for data validation error type
    if (isTruthy(type) && equalsIgnoreCase(type, ErrorType.DATA_VALIDATION)) {
      this.setErrorsFromApiResponse(error.fields);
    } else {
      this.setErrorMessage(error?.message);
    }

    // Enable submitting after handling the error
    this.enableSubmitting();
  }


  /**
   * Stops the propagation and default behavior of the provided event.
   *
   * Prevents the default action and stops the event from propagating to parent elements.
   *
   * @param {Event} evt - The event to be stopped.
   * @protected
   */
  protected stopEvent(evt: Event): void {
    evt.preventDefault();
    evt.stopPropagation();
  }

  /**
   * Resets the error message to an empty string.
   *
   * Sets the error message property to an empty string.
   *
   * @public
   */
  public resetErrorMessage(): void {
    this.errorMessage = '';
  }

  /**
   * Sets the error message with the provided string, handling specific cases.
   *
   * Assigns the provided message to the error message property. If the message includes a connection
   * refused error, it sets the error message to a default value.
   *
   * @param {string} message - The error message to be set.
   * @public
   */
  public setErrorMessage(message: string): void {
    this.errorMessage = message || '';

    // Check for a specific error message and replace it with a default value
    if (this.errorMessage.includes(ERR_CONNECTION_REFUSED_MESSAGE)) {
      this.errorMessage = DEFAULT_ERROR_MESSAGE;
    }
  }

  /**
   * Sets the status message with the provided string.
   *
   * Assigns the provided message to the status message property.
   *
   * @param {string} message - The status message to be set.
   * @protected
   */
  protected setStatusMessage(message: string): void {
    this.statusMessage = message;
  }

  /**
   * Marks the form as ready.
   *
   * Sets the `isFormReady` property to `true`.
   *
   * @public
   */
  public formReady(): void {
    this.isFormReady = true;
  }


  /**
   * Navigates to the 'entries' route, optionally removing specified segments from the current URL.
   *
   * This method adjusts the current URL by removing a specified number of segments and appends 'entries'
   * to the URL, then navigates to the updated route.
   *
   * @param {string | null} errorMessage - Optional error message to be passed in the navigation state.
   *                                      Defaults to an empty string if not provided.
   * @param {number} urlSegmentToRemove - Number of URL segments to remove. Defaults to 2 if not provided.
   * @returns {Promise<void>} A Promise that resolves once the navigation is complete.
   * @example
   * // Navigate to 'entries' route without removing any segments
   * await this.goToEntries();
   *
   * // Navigate to 'entries' route and remove 3 segments from the current URL
   * await this.goToEntries('Custom error message', 3);
   */
  protected async goToEntries(errorMessage: string | null = '', urlSegmentToRemove: number = 2): Promise<void> {
    // Split the current URL into segments
    const currentUrlSegments = this.getRouter().url.split('/');

    // Remove the specified number of segments from the end of the array
    currentUrlSegments.splice(-2 * urlSegmentToRemove, 2 * urlSegmentToRemove);

    // Construct the new route by appending 'entries' to the modified segments
    const newRoute: string = [...currentUrlSegments, 'entries'].join('/');

    // Navigate to the new route with the provided error message in the navigation state
    await this.getRouter().navigate([newRoute], { state: { error: errorMessage } }).then((m: boolean) => m);
  }


  /**
   * Navigates to the home route.
   *
   * Uses the Angular Router to navigate to the base path, directing the user to the home route of the application.
   *
   * @returns {Promise<void>} A Promise that resolves once the navigation is complete.
   */
  async goHome(): Promise<void> {
    await this.getRouter().navigate([BASE_PATH]);
  }

  /**
   * Returns a no-operation function.
   *
   * The returned function does nothing when invoked and accepts any number of arguments.
   *
   * @public
   */
  get noOpFunction(): (...data: any[]) => void {
    return (): void => { };
  }

  /**
   * Returns an observable that emits an empty value.
   *
   * The observable is created using the `of` operator with a predefined empty value.
   *
   * @param {...any} data - Additional data to be ignored.
   * @returns {Observable<any>} An observable emitting an empty value.
   * @public
   */
  public noOpFunction$(...data: any[]): Observable<any> {
    return of(ANY_EMPTY);
  }


}
