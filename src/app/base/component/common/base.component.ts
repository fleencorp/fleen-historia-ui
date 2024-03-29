import {ErrorResponse} from "@app/model/response";
import {ANY_EMPTY, COPIED_MESSAGE, DEFAULT_ERROR_MESSAGE, ERR_CONNECTION_REFUSED_MESSAGE} from "@app/constant";
import {NavigationExtras, Router} from "@angular/router";
import {BASE_PATH} from "@app/constant/config.const";
import {isTruthy, nonNull} from "@app/shared/helper";
import {ChangeDetectorRef} from "@angular/core";

/**
 * BaseComponent serves as a base class for Angular components,
 * providing common properties and methods for handling errors and loading states.
 */
export abstract class BaseComponent {

  /**
   * The page title displayed in the component.
   */
  public pageTitle: string | undefined = '';

  /**
   * Error message to display in case of an error.
   */
  protected errorMessage: string = '';

  /**
   * Loading state indicator. Set to `true` when loading, `false` otherwise.
   */
  public isLoading: boolean = false;

  /**
   * The delay (in milliseconds) before displaying the loading spinner.
   */
  protected readonly LOADING_SPINNER_DELAY: number = 4000;

  /** The status message to display for form-related actions. */
  public statusMessage: string = '';

  /** Holds the verification message displayed to the user. */
  public verificationMessage: string = '';

  /** Abstract method to get the Router instance, to be implemented by child classes. */
  protected abstract getRouter(): Router;

  /** Abstract method to get the Change Detector instance, to be implemented by child classes. */
  protected getChangeDetector(): ChangeDetectorRef {
    return ANY_EMPTY;
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
   * Handles the error by setting the error message and handling specific cases.
   * @param error - The error response object.
   */
  protected handleError(error: ErrorResponse): void {
    this.errorMessage = error?.message || '';

    // Handle specific error cases
    if (this.errorMessage.includes(ERR_CONNECTION_REFUSED_MESSAGE)) {
      this.errorMessage = DEFAULT_ERROR_MESSAGE;
    }
  }

  /**
   * Enables the loading state by setting `isLoading` to `true`.
   */
  protected enableLoading(): void {
    this.isLoading = true;
  }

  /**
   * Disables the loading state by setting `isLoading` to `false`.
   */
  protected disableLoading(): void {
    this.isLoading = false;
  }

  /**
   * Returns a boolean indicating whether the component can display content.
   * This is determined by checking if the component is not in a loading state.
   */
  get canDisplay(): boolean {
    return !this.isLoading;
  }

  protected setVerificationMessage(): void { }

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
   * Clears the verification message.
   */
  protected clearVerificationMessage(): void {
    this.verificationMessage = '';
  }

  /**
   * Clears the status message.
   */
  protected clearStatusMessage(): void {
    this.statusMessage = '';
  }

  /**
   * Clears the status and verification message.
   */
  protected clearMessages(): void {
    this.clearStatusMessage();
    this.clearVerificationMessage();
  }

  /**
   * Sets a property to a new value temporarily and restores it after a specified delay.
   * @param propName The name of the property to set.
   * @param newValue The new value to set the property to temporarily. Defaults to 'Copied'.
   * @param delayBeforeRestore The delay in milliseconds before restoring the property to its original value. Defaults to 3000 milliseconds.
   */
  protected setAndRestoreAfterDelay(propName: string, newValue: string = COPIED_MESSAGE, delayBeforeRestore: number = 3000): void {
    const currentMessage: string = this[propName];

    // Check if currentMessage is truthy and non-null
    if (isTruthy(currentMessage) && nonNull(currentMessage)) {
      this[propName] = newValue;

      setTimeout((): void => {
        this[propName] = currentMessage;
      }, delayBeforeRestore);
    }
  }

  /**
   * Invokes the provided callback function if it exists.
   * @param cb The callback function to invoke.
   */
  protected invokeCallback(cb?: Function): void {
    if (cb) { cb(); }
  }

  /**
   * Invokes the provided callback function if it exists.
   * @param cb The callback function to invoke.
   * @param withDelay the time in seconds before the call back is invoked
   */
  protected invokeCallbackWithDelay(cb?: Function, withDelay: number = 3000): void {
    setTimeout((): void => {
      if (cb) { cb(); }
    }, withDelay);
  }

  /**
   * Protected method responsible for navigating to a specified route with optional query parameters and navigation extras.
   *
   * @param pathVars An array of path segments constituting the route to navigate to.
   * @param queryParams Optional query parameters to include in the navigation.
   * @param extras Optional navigation extras such as navigation behavior, query parameters handling, etc.
   */
  protected navigateTo(pathVars: string[], queryParams?: any, extras?: NavigationExtras): void {
    // Navigate to the specified route using Angular Router
    this.getRouter().navigate(pathVars, { queryParams, ...extras })
      .then((r: boolean): boolean => r);
  }


}
