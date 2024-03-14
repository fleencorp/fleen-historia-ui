import {FormBuilder} from '@angular/forms';
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {BaseFormComponent} from "@app/base/component";
import {ErrorResponse} from "@app/model/response";
import {isFalsy, isTruthy} from "@app/shared/helper";

/**
 * Base class for add components that handle form submission and navigation.
 * Provides methods for initializing form, saving entry, and navigating.
 *
 * @template D The type of data being added.
 * @template R The type of response received after adding data.
 * @author Yusuf Alamu Musa
 * @version 1.0
 */
export abstract class BaseAddComponent<D, R> extends BaseFormComponent {

  /**
   * Constructs a new BaseAddComponent.
   * @param router The Angular router service for navigation.
   * @param formBuilder The Angular FormBuilder service for creating forms.
   */
  protected constructor(
      protected router: Router,
      protected formBuilder: FormBuilder) {
    super();
  }

  /**
   * Initializes the form for adding data.
   * Subclasses must implement this method.
   */
  protected abstract initForm(): void;

  /**
   * Saves the entry data.
   * Subclasses must implement this method.
   * @param payload The data to be saved.
   * @returns An Observable that emits the response after saving.
   */
  protected abstract $saveEntry(payload: D): Observable<R>;

  /**
   * Retrieves the Angular router service.
   * @returns The Angular router service.
   */
  protected override getRouter(): Router {
    return this.router;
  }

  /**
   * Navigates to the entries page after adding an entry.
   * @param errorMessage Optional error message to display before navigating.
   */
  protected override async goToEntries(errorMessage?: string): Promise<void> {
    await super.goToEntries(errorMessage, 1);
  }


  /**
   * Handles form submission by saving the entry data.
   * Validates the form, prevents duplicate submissions, and handles errors.
   * If the form is valid and submission is not already in progress,
   * the method sends the entry data to the server for saving.
   * Upon successful saving, it enables form submission and navigates to the entries page.
   *
   * @remarks
   * This method ensures that the form is valid and submission is not already in progress
   * before attempting to save the entry data. It subscribes to the observable returned by
   * `$saveEntry()` method to handle the response. In case of an error during saving,
   * the `error` callback is invoked to handle the error response, and upon successful
   * saving, the `complete` callback is triggered to enable form submission and navigate
   * to the entries page.
   */
  protected saveEntry(): void {
    // Check if form is valid and submission is not already in progress
    if (isTruthy(this.fleenForm) && this.fleenForm.valid && isFalsy(this.isSubmitting)) {

      // Disable form submission and reset error message
      this.disableSubmittingAndResetErrorMessage();

      this.$saveEntry(this.fleenForm.value)
        .subscribe({
          error: (result: ErrorResponse): void => { this.handleError(result); },
          // Upon successful saving, enable form submission and navigate to entries page
          complete: async (): Promise<void> => {
            this.enableSubmitting();
            await this.goToEntries();
          }
      });
    }
  }

}
