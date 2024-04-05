import {AbstractControl, FormBuilder, FormGroup} from "@angular/forms";
import {convertToDesiredFormat, equalsIgnoreCase, isObject, isTruthy, toCamelCase} from "@app/shared/helper";
import {Observable, of} from "rxjs";
import {BaseComponent} from "@app/base/component";
import {AnyObject} from "@app/model/type";
import {ErrorResponse} from "@app/model/response";
import {ErrorType} from "@app/model/enum";
import {ANY_EMPTY, DEFAULT_ERROR_MESSAGE, ERR_CONNECTION_REFUSED_MESSAGE} from "@app/constant";
import {IconDefinition} from "@fortawesome/free-solid-svg-icons";

/**
 * Abstract base component for form-related functionality.
 * Extends the BaseComponent class and provides common form handling methods.
 */
export abstract class BaseFormComponent extends BaseComponent {

  /** The main form group for the component. */
  protected fleenForm: FormGroup = new FormGroup<any>({});

  /** The name of the API field that represents the name of the field in which the error occurred. */
  private readonly API_ERROR_FIELD_NAME: string = "field";

  /** The name of the API field that represents error messages of all input parameters or fields. */
  private readonly API_ERROR_MESSAGES_NAME: string = "errors";

  /** Indicates whether the form is currently submitting. */
  public isSubmitting: boolean = false;

  /** Indicates whether the form is ready for interaction. */
  public isFormReady: boolean = false;

  /** Indicates whether the form submission and processing is completed. */
  public isFormCompleted: boolean = false;

  /** Abstract property for the FormBuilder, to be implemented by child classes. */
  protected abstract formBuilder: FormBuilder;

  public isSendingVerificationCode: boolean = false;

  protected hideOldPassword: boolean = true;
  protected hideNewPassword: boolean = true;
  protected hideConfirmPassword: boolean = true;


  /**
   * Recursively retrieves all property keys from an object.
   * @param obj - The object from which to retrieve property keys.
   * @returns An array of all property keys.
   */
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

  /**
   * Sets errors on form controls based on the API response.
   * @param errors - The array of errors from the API response.
   */
  protected setErrorsFromApiResponse(errors: AnyObject[] | any): void {
    if (isTruthy(errors) && Array.isArray(errors)) {
      errors.forEach((error): void => {
        this.setControlError(this.fleenForm, error[this.API_ERROR_FIELD_NAME], this.getMessagesInSentence(error[this.API_ERROR_MESSAGES_NAME]));
      });
      this.fleenForm.markAsTouched();
    }
  }

  /**
   * Sets external form errors based on the API response.
   * @param errors - The array of errors from the API response.
   * @param form - The form group to set errors on.
   */
  protected setExternalFormErrorsFromApiResponse(errors: AnyObject[], form: FormGroup): void {
    if (isTruthy(errors) && Array.isArray(errors)) {
      errors.forEach((error): void => {
        this.setControlError(form, error[this.API_ERROR_FIELD_NAME], this.getMessagesInSentence(error[this.API_ERROR_MESSAGES_NAME]));
      });
      form.markAsTouched();
    }
  }

  /**
   * Sets error messages for form controls recursively.
   *
   * @param value The value to set errors for (FormGroup, AbstractControl, Array, or Object).
   * @param fieldName The name of the field for which to set the error.
   * @param errorMessage The error message to set.
   *
   * @example
   * // Consider a scenario with a dynamic user profile form having nested form groups.
   * // You want to set a common error message for the 'lastName' field across all sections.
   * const userForm: FormGroup = new FormGroup({
   *   personalInfo: new FormGroup({
   *     firstName: new FormControl('', Validators.required),
   *     lastName: new FormControl('', Validators.required),
   *   }),
   *   contactInfo: new FormGroup({
   *     email: new FormControl('', Validators.email),
   *     phone: new FormControl('', Validators.pattern('[0-9]+')),
   *   }),
   *   addressInfo: new FormGroup({
   *     street: new FormControl(''),
   *     city: new FormControl(''),
   *   }),
   * });
   *
   * // Set an error for the 'lastName' field across all form sections
   * this.setControlError(userForm, 'lastName', 'Last Name is required.');
   *
   * // In a scenario where the form is dynamic and has multiple 'phone' controls nested in an array:
   * const dynamicForm: FormGroup = new FormGroup({
   *   phones: this.formBuilder.array([
   *     new FormControl('', Validators.pattern('[0-9]+')),
   *     new FormControl('', Validators.pattern('[0-9]+')),
   *   ]),
   * });
   *
   * // Set a common error message for all 'phone' controls in the array
   * this.setControlError(dynamicForm, 'phone', 'Invalid phone number.');
   */
  protected setControlError(value: FormGroup | AbstractControl | any[] | any, fieldName: string, errorMessage: string): void {
    // Attempt to get the form control using the field name and its camelCase variant
    const control: AbstractControl | any = value.get(fieldName) || value.get(toCamelCase(fieldName));

    // If the value is a FormGroup, set error for the specified field
    if (value instanceof FormGroup) {
      this.setFieldError(control, errorMessage, convertToDesiredFormat(fieldName));
    }
    // If the value is an array, recursively call setControlError for each element
    else if (Array.isArray(value)) {
      // Example: Set error for each 'phone' control in the 'phones' array
      value.forEach((subControl): void => {
        this.setControlError(subControl, fieldName, errorMessage);
      });
    }   // If the value is an AbstractControl, set error for the specified field
    else if (value instanceof AbstractControl) {
      this.setFieldError(control, errorMessage, convertToDesiredFormat(fieldName));

      // If the AbstractControl is a FormGroup, iterate over its controls and call setControlError
      if (value instanceof FormGroup) {
        Object.keys(value.controls).forEach((key: string): void => {
          this.setControlError(value.get(key), fieldName, errorMessage);
        });
      }
    }
    // If the value is an Object and an Array, recursively call setControlError for each property
    else if (isObject(value) && Array.isArray(value)) {
      for (const key in (<any>value)) {
        if (value.hasOwnProperty(key) && isObject(value[key])) {
          this.setControlError(value[key], fieldName, errorMessage);
        }
      }
    }
  }

  /**
   * Retrieves error messages from an array and formats them into a single sentence.
   * If the array contains only one message, that message is returned.
   * If the array contains multiple messages, they are joined with periods and spaces.
   * If the input is not a truthy array, an empty string is returned.
   *
   * @param messages - The array of error messages to be formatted.
   * @returns A single sentence containing the formatted error messages.
   */
  protected getMessagesInSentence(messages: string[]): string {
    // Check if the messages array is truthy and an array
    if (isTruthy(messages) && Array.isArray(messages)) {
      // If there is only one message in the array, return that message
      if (messages.length === 1) {
        return messages[0];
      }
      // If there are multiple messages, join them with periods and spaces
      return messages.join('. ') + '.';
    }
    // Return an empty string if the input is not a truthy array
    return '';
  }

  /**
   * Sets error for a form control.
   *
   * @param control The form control for which to set the error.
   * @param errorMessage The error message to set.
   * @param fieldName The name of the field associated with the control.
   *
   * @example
   * // Consider a scenario where you want to set a custom error for a specific form control.
   * const lastNameControl: FormControl = userForm.get('personalInfo.lastName') as FormControl;
   * this.setFieldError(lastNameControl, 'Last Name is required.', 'lastName');
   */
  protected setFieldError(control: any, errorMessage: string, fieldName: string): void {
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
    } else if (error?.message) {
      this.setErrorMessage(error?.message);
    } else {
      this.setErrorMessage(ERR_CONNECTION_REFUSED_MESSAGE);
    }

    // Enable submitting after handling the error
    this.enableSubmitting();
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
   * Marks the form submission as completed.
   *
   * This method sets the `isFormCompleted` property to `true` to indicate that the form submission
   * has been completed successfully. Optionally, you can provide a delay (in milliseconds) after
   * which the `isFormCompleted` property will be reset to `false`.
   *
   * @param delayToReset Optional. The delay (in milliseconds) after which to reset the `isFormCompleted`
   * property to `false`. Defaults to 5000 milliseconds (5 seconds). If set to 0 or falsy value, the
   * `isFormCompleted` property will not be automatically reset.
   * @param cb Callback to invoke after completion
   * @public
   */
  protected formCompleted(cb?: Function, delayToReset: number = 5000): void {
    // Marks the form submission as completed
    this.isFormCompleted = true;

    // Reset the `isFormCompleted` property after the specified delay
    if (delayToReset) {
      setTimeout((): void => {
        this.isFormCompleted = false;
        this.invokeCallback(cb);
      }, delayToReset);
    }
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
  protected async goToEntries(errorMessage: string | null = '', urlSegmentToRemove: number = 1): Promise<void> {
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

  /**
   * Enables the flag indicating that the system is sending a verification code.
   */
  protected enableIsSendingVerificationCode(): void {
    this.isSendingVerificationCode = true;
  }

  /**
   * Disables the flag indicating that the system has finished sending the verification code.
   */
  protected disableIsSendingVerificationCode(): void {
    this.isSendingVerificationCode = false;
  }

  public togglePasswordVisibility(fieldName: string): void {
    if (fieldName === 'oldPassword') {
      this.hideOldPassword = !this.hideOldPassword;
    } else if (fieldName === 'newPassword') {
      this.hideNewPassword = !this.hideNewPassword;
    } else if (fieldName === 'confirmPassword') {
      this.hideConfirmPassword = !this.hideConfirmPassword;
    }
  }

}
