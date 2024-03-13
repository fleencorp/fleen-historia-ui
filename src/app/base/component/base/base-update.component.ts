import {BaseFormComponent} from "@app/base/component";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {Observable} from "rxjs";
import {isFalsy, isTruthy, nonNull} from "@app/shared/helper";
import {ErrorResponse} from "@app/model/response";

/**
 * Abstract base class for components responsible for updating entries.
 * @template T The type of the entry being updated.
 * @template D The type of data used in the update process.
 */
export abstract class BaseUpdateComponent<T, D> extends BaseFormComponent {

  /** The view of the entry being updated. */
  public abstract entryView: T;

  /** The ID of the entry being updated. */
  protected entryId: number | string = 0;

  /**
   * Constructor of the BaseUpdateComponent.
   * @param router The Router instance used for navigation.
   * @param route The ActivatedRoute instance providing access to route parameters.
   */
  protected constructor(protected router: Router, protected route: ActivatedRoute) {
    super();
  }

  /**
   * Abstract method to retrieve the entry to be updated from the service.
   * @param id The ID of the entry to be retrieved.
   * @returns An Observable that emits the entry to be updated.
   */
  protected abstract getServiceEntry(id: number | string): Observable<T>;

  /**
   * Abstract method to initialize the form used for updating the entry.
   */
  protected abstract initForm(): void;

  /**
   * Method to initialize details related to the update process.
   * This method can be overridden by subclasses to perform additional initialization tasks.
   */
  protected initDetails(): void { }

  /**
   * Abstract method to update an entry using the provided payload.
   * @param id The ID of the entry to be updated.
   * @param payload The data payload used to update the entry.
   * @returns An Observable that emits the updated entry.
   */
  protected abstract $updateEntry(id: string | number, payload: D): Observable<T>;

  /**
   * Initializes the entry update process by retrieving the entry ID from the route parameters
   * and fetching the corresponding entry from the service.
   * If the ID is not valid, it redirects to the entries page.
   */
  public async initEntry(cb?: Function): Promise<void> {
    this.route.paramMap.subscribe(async (params: ParamMap): Promise<void> => {
      const id: number | string | null | any = params?.get('id');
      await this.initAndGetEntry(id, cb);
    });
  }

  public async initAndGetEntry(id: string | number | any | null, cb?: Function): Promise<void> {
    if (isNaN(id)) {
      await this.goToEntries();
      return;
    }
    this.entryId = id;
    this.getEntry(id, cb);
  }

  /**
   * Retrieves the entry to be updated from the service based on the provided ID.
   * If successful, it initializes the entry view, form, and details.
   * If an error occurs, it redirects to the entries page with an optional error message.
   * @param id The ID of the entry to retrieve.
   * @param cb A callback function to execute after successful retrieval of data
   */
  protected getEntry(id: number | string, cb?: Function): void {
    this.getServiceEntry(id)
      .subscribe({
        next: (result: T): void => {
          this.entryView = result;
          this.initForm();
          this.initDetails();
          this.invokeCallback(cb);
        },
        error: async (error: ErrorResponse): Promise<void> => {
          await this.goToEntries(error.message);
          return;
        }
      });
  }

  /**
   * Initiates the update process for the entry.
   * If the form is valid and submission is not in progress, it disables submitting,
   * updates the entry using the provided data, and redirects to the entries page upon completion.
   */
  public updateEntry(): void {
    if (isTruthy(this.fleenForm) && this.fleenForm.valid && isFalsy(this.isSubmitting)) {
      this.disableSubmittingAndResetErrorMessage();

      this.$updateEntry(this.entryId, this.fleenForm.value)
        .subscribe({
          error: (result: ErrorResponse): void => { this.handleError(result); },
          complete: async (): Promise<void> => {
            this.enableSubmitting();
            await this.goToEntries();
          }
      });
    }
  }

  /**
   * Overrides the base class method to return the Router instance used for navigation.
   *
   * @returns The Router instance used for navigation.
   */
  protected override getRouter(): Router {
    return this.router;
  }

  protected invokeCallback(cb?: Function): void {
    if (cb) { cb(); }
  }

}
