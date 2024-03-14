import {Observable} from "rxjs";
import {BaseFormComponent} from "@app/base/component";
import {CountAllResponse, DeleteResponse} from "@app/model/response/common";
import {isFalsy, isTruthy} from "@app/shared/helper";
import {ErrorResponse} from "@app/model/response";

/**
 * Base class for components that handle deletion of all entries.
 * Provides methods for counting all entries and deleting all entries.
 */
export abstract class BaseEntriesDeleteAllComponent extends BaseFormComponent {

  /**
   * Indicates whether there are entries available for deletion.
   */
  public isEntriesAvailable: boolean = false;

  /**
   * Retrieves the total count of entries.
   * Subclasses must implement this method.
   * @returns An Observable that emits the response containing the total count of entries.
   */
  protected abstract serviceCountAll(): Observable<CountAllResponse>;

  /**
   * Deletes all entries.
   * Subclasses must implement this method.
   * @returns An Observable that emits the response after deleting all entries.
   */
  protected abstract serviceDeleteAll(): Observable<DeleteResponse>;

  /**
   * Counts all entries and updates the status of `isEntriesAvailable`.
   * Handles errors during counting.
   */
  public countAll(): void {
    this.serviceCountAll().subscribe({
      next: (result: CountAllResponse): void => {
        if (isTruthy(result.total)) { this.isEntriesAvailable = true; }
      },
      error: (error: ErrorResponse): void => { this.handleError(error); }
    });
  }

  /**
   * Deletes all entries if submission is not already in progress.
   * Handles errors during deletion and navigates to entries page upon completion.
   */
  public async deleteAll(): Promise<void> {
    if (isFalsy(this.isSubmitting)) {
      this.disableSubmittingAndResetErrorMessage();

      this.serviceDeleteAll().subscribe({
        error: (error: ErrorResponse): void => { this.handleError(error); },
        complete: (): void => { this.goToEntries(null, 1); }
      });
    }
  }
}
