import {Component, Input} from '@angular/core';
import {AbstractControl} from "@angular/forms";
import {AnyObject} from "@app/model/type";
import {validationErrorMessages} from "@app/messages/validation";
import {isTruthy} from "@app/shared/helper";

/**
 * Validation Error Component.
 *
 * This component is used to display validation error messages for a given form control.
 *
 * @usageNotes
 * ### Example
 *
 * ```html
 * <app-validation-error
 *   [control]="yourFormControl"
 *   [control-label]="'Your Field'"
 *   [control-options]="yourOptions">
 * </app-validation-error>
 * ```
 *
 * @remarks
 * This component assumes that there is a `validationErrorMessages` object defined in the parent component or service
 * that contains functions for custom error message formatting based on the validation error key.
 *
 * @example
 * ```typescript
 * const validationErrorMessages = {
 *   required: (control, label, options) => `${label} is required.`,
 * };
 * ```
 *
 * @export
 * @class ValidationErrorComponent
 * @author Yusuf Alamu Musa
 */
@Component({
  selector: 'app-validation-error',
  templateUrl: './validation-error.component.html',
  styleUrls: ['./validation-error.component.css']
})
export class ValidationErrorComponent {

  /**
   * The form control to display validation errors for.
   *
   * @type {AbstractControl | undefined | null}
   * @memberof ValidationErrorComponent
   */
  @Input() public control: AbstractControl | undefined | null;

  /**
   * The label for the form control.
   *
   * @type {string}
   * @memberof ValidationErrorComponent
   */
  @Input('control-label') public controlLabel: string = "This field";

  /**
   * Additional options for customizing the validation error messages.
   *
   * @type {AnyObject}
   * @memberof ValidationErrorComponent
   */
  @Input('control-options') public controlOptions: AnyObject = {};

  /**
   * Gets the validation error messages for the specified form control.
   *
   * @type {string[]}
   * @memberof ValidationErrorComponent
   */
  get errors(): string[] {
    if (this.isInvalidAndTouched) {
      return this.getValidationErrorMessages();
    }
    return [];
  }

  /**
   * Gets an array of validation error messages for the specified form control.
   *
   * @private
   * @returns {string[]}
   * @memberof ValidationErrorComponent
   */
  private getValidationErrorMessages(): string[] {
    const errors: string[] = [];

    if (isTruthy(this.control)) {
      for (const errorKey in this.control?.errors) {
        if (this.control?.errors.hasOwnProperty(errorKey) && validationErrorMessages.hasOwnProperty(errorKey)) {
          errors.push(validationErrorMessages[errorKey](this.control, this.controlLabel, this.controlOptions));
        }
      }
    }

    return errors;
  }

  /**
   * Checks if the form control is invalid and has been touched.
   *
   * @private
   * @type {boolean}
   * @memberof ValidationErrorComponent
   */
  private get isInvalidAndTouched(): boolean {
    return !!this.control && this.control.invalid && (this.control.dirty || this.control.touched);
  }

}
