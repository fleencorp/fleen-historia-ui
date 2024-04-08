import {ActivatedRoute, Navigation, Params, Router} from "@angular/router";
import {Observable, of} from "rxjs";
import {BaseFormComponent} from "@app/base/component";
import {Location} from "@angular/common";
import {
  AnyObject,
  DeleteIdsPayload,
  PaginationAction,
  PaginationToken,
  SearchFilter,
  SearchPayload
} from "@app/model/type";
import {
  DEFAULT_NEXT_PAGE_TOKEN_KEY,
  DEFAULT_PAGE_NO_KEY,
  DEFAULT_PAGE_SIZE,
  DEFAULT_PREV_PAGE_TOKEN_KEY
} from "@app/constant";
import {SearchResultView} from "@app/model/view";
import {isFalsy, isTruthy, removePropertiesWithBlankKeysAndValues} from "@app/shared/helper";
import {DeleteStatusEnum} from "@app/model/enum/base.enum";
import {DeleteResponse} from "@app/model/response/common";
import {ErrorResponse} from "@app/model/response";

/**
 * Base abstract class for components dealing with paginated entries.
 *
 * @template T The type of entries managed by the component.
 *
 * @author Yusuf Alamu Musa
 * @version 1.0
 */
export abstract class BaseEntriesComponent<T extends Object> extends BaseFormComponent {

  /**
   * Represents a constant specifying a pagination action, which can be either 'next' or 'previous'.
   *
   * @remarks
   * The value of this constant can only be 'next' or 'previous' or 'none'.
   */
  private paginationAction: PaginationAction = 'none';

  /**
   * The current page number.
   */
  public currentPage: number = 1;

  /**
   * The number of entries to display per page.
   */
  public pageSize: number = DEFAULT_PAGE_SIZE;

  /**
   * Indicates whether the current page is the first page.
   */
  public isFirst: boolean | undefined;

  /**
   * @property nextPageToken
   * @description
   *   A string indicating whether there is a next page token.
   */
  public nextPageToken: string | undefined;

  /**
   * @property prevPageToken
   * @description
   *   A string indicating whether there is a previous page token.
   */
  public prevPageToken: string | undefined;

  /**
   * Indicates whether the current page is the last page.
   */
  public isLast: boolean | undefined;

  /**
   * An array of entries.
   */
  public entries: T[] = [];

  /**
   * An array of IDs of entries marked for deletion.
   */
  private deleteIds: Array<number | string> = [];

  /**
   * The total number of entries.
   */
  private totalEntries: number = 0;

  /**
   * Parameters used for searching/filtering entries.
   */
  protected searchParams: AnyObject = {};

  /**
   * An array of search filters.
   */
  protected searchFilter: SearchFilter[] = [];

  /**
   * A key indicating the status of deleting entries
   */
  public isDeleting: boolean = false;

  /**
   * A key indicating the status of search process
   */
  public isSearching: boolean = false;

  /**
   * A key indicating the status of search reset process
   */
  public isResettingSearch: boolean = false;

  /**
   * Represents the deletion status of an entry.
   * Possible values are defined in the DeleteStatusEnum.
   * Default value is DeleteStatusEnum.NOT_STARTED.
   */
  public isDeletingEntry: DeleteStatusEnum = DeleteStatusEnum.NOT_STARTED;

  /**
   * Represents the ID of the entry that has been deleted.
   * Default value is 0.
   * This property is typically used to track the ID of the entry being deleted for reference purposes.
   */
  public deletedId: string | number = 0;

  /**
   * Represents whether a navigation process is currently in progress.
   * This property is typically used to track the state of navigation to prevent multiple navigation attempts.
   * Default value is false.
   */
  public navigationInProgress: boolean = false;

  /**
   * The form builder instance.
   */
  protected formBuilder;

  /**
   * A string representing the default key used to identify entries in the application.
   * By default, it is set to 'id'.
   * Developers can override this property to specify a different key if needed.
   */
  protected defaultEntryIdKey: string = 'id';

  /**
   * Constructs a new BaseEntriesComponent.
   *
   * @param router The Angular router service.
   * @param route The current route snapshot.
   * @param location The Angular location service.
   */
  protected constructor(protected router: Router, protected route: ActivatedRoute, protected location: Location) {
    super();
    this.initRouteState(this.router.getCurrentNavigation());
  }

  /**
   * Abstract method to find entries based on the provided parameters.
   *
   * @param params The search parameters.
   * @returns An observable emitting a SearchResultView containing the search results.
   */
  abstract findEntries(params: AnyObject): Observable<SearchResultView<T>>;

  /**
   * Abstract method to delete entries based on the provided payload.
   *
   * @param payload The payload containing IDs of entries to be deleted.
   * @returns An observable emitting the result of the deletion operation.
   */
  abstract deleteEntries(payload: DeleteIdsPayload): Observable<any>;


  /**
   * Protected method responsible for initiating the deletion of an entry.
   * Checks if the submission is not in progress and the form is valid before proceeding with the deletion process.
   * If conditions are met, it disables submission, resets error messages, initializes the entry deletion process, and calls the deleteEntryMethod.
   * Upon completion of the deletion process, it handles success or error responses and re-enables submission.
   *
   * @param id The ID of the entry to be deleted.
   */
  protected deleteEntry(id: number | string): void {
    // Check if submission is not in progress and the form is valid
    if (isFalsy(this.isSubmitting) && this.fleenForm.valid) {
      // Disable submission and reset error messages
      this.disableSubmittingAndResetErrorMessage();

      // Initialize entry deletion process
      this.initEntryDeleteProcess(id);

      // Call deleteEntryMethod to delete the entry
      this.deleteEntryMethod(id)
        .subscribe({
          next: (result: DeleteResponse): void => { this.handleSuccessfulEntryDeletion(result.message) },
          error: (error: ErrorResponse): void => { this.handleError(error); },
          complete: async (): Promise<void> => { this.handleDeletedEntry(); }
      });
    }
  }

  /**
   * Handles the deletion of an entry.
   * This method typically enables the submitting state for the deletion process.
   */
  public handleDeletedEntry(): void {
    this.enableSubmitting();
  }

  /**
   * Handles the successful deletion of an entry.
   * Sets the deletion status to 'COMPLETED', sets a status message, and invokes a callback function after a delay.
   *
   * @param message A string containing the success message.
   */
  public handleSuccessfulEntryDeletion(message: string): void {
    this.isDeletingEntry = DeleteStatusEnum.COMPLETED;
    this.setStatusMessageAndClear(message);
    this.invokeCallbackWithDelay(this.refreshDeletedEntry.bind(this));
  }

  /**
   * Refreshes the entries after a successful deletion by calling 'refreshEntriesByDeletedId()' and resetting the 'deletedId' property.
   */
  public refreshDeletedEntry(): void {
    this.refreshEntriesByDeletedId();
    this.deletedId = 0;
  }

  /**
   * Initiates the entry deletion process by setting the deletion status to 'IN_PROGRESS' and setting the 'deletedId'.
   *
   * @param id The ID of the entry to be deleted.
   */
  public initEntryDeleteProcess(id: number | string): void {
    this.isDeletingEntry = DeleteStatusEnum.IN_PROGRESS;
    this.deletedId = id;
  }

  /**
   * Method responsible for deleting an entry.
   * This method returns an Observable that emits a DeleteResponse object.
   *
   * @param id The ID of the entry to be deleted.
   * @returns An Observable emitting a DeleteResponse object.
   */
  protected deleteEntryMethod(id: number | string): Observable<DeleteResponse> {
    // Placeholder implementation, should be overridden in child components or services
    return of(new DeleteResponse({} as DeleteResponse));
  }

  /**
   * Returns the router instance.
   *
   * @returns The Angular router service instance.
   */
  protected override getRouter(): Router {
    return this.router;
  }

  /**
   * TrackBy function for ngFor directive to optimize rendering.
   *
   * @param index The index of the item.
   * @param item The item being tracked.
   * @returns The unique identifier of the item.
   */
  public trackByFn(index: number, item: any): any {
    return item.id;
  }

  /**
   * Handles the change in checked state of an entry.
   *
   * @param id The ID of the entry.
   * @param checked The new checked state of the entry.
   */
  public handleChecked(id: number | string, checked: boolean): void {
    if (checked && !this.deleteIds.includes(id)) {
      this.deleteIds.push(id);
    } else {
      this.deleteIds = this.deleteIds
        .filter((val: number | string): boolean => val !== id);
    }
  }

  /**
   * Updates the entry with the specified ID.
   *
   * @param id The ID of the entry to update.
   * @returns A Promise that resolves when the navigation is complete.
   */
  public async updateEntry(id: number | string | undefined): Promise<void> {
    if (isTruthy(id)) {
      await this.router.navigate(['..', 'update', id], {relativeTo: this.route});
    }
  }

  /**
   * Views the detail of the entry with the specified ID.
   *
   * @param id The ID of the entry to view details for.
   * @returns A Promise that resolves when the navigation is complete.
   */
  public async viewDetail(id: number | string | undefined): Promise<void> {
    if (isTruthy(id)) {
      await this.router.navigate(['..', 'detail', id], {relativeTo: this.route});
    }
  }

  /**
   * Checks if the next page is available based on the current page and total entries.
   *
   * @returns A boolean indicating whether the next page is available.
   */
  private isNextPageAvailable(): boolean {
    const totalPages: number = Math.ceil( this.totalEntries / this.pageSize);
    return this.currentPage < totalPages;
  }

  /**
   * Initializes the component's properties based on the provided search result.
   *
   * @param result The search result view containing entries and pagination details.
   */
  private initResult(result: SearchResultView<any>): void {
    this.isFirst = result.isFirst;
    this.isLast = result.isLast;
    this.nextPageToken = result.nextPageToken;
    this.prevPageToken = result.prevPageToken;
    this.entries = result.values;
    this.totalEntries = result.totalEntries;
  }

  private enableNavigationInProgress(): void {
    this.navigationInProgress = true;
  }

  /**
   * Private method used to disable the navigation in progress state.
   * This method sets the 'navigationInProgress' property to false.
   * It's typically called when the navigation process is completed or canceled.
   */
  private disableNavigationInProgress(): void {
    this.navigationInProgress = false;
  }

  /**
   * Private method used to enable the search in progress state.
   * This method sets the 'isSearching' property to true.
   * It's typically called when a search operation starts.
   */
  private enableSearchInProgress(): void {
    this.isSearching = true;
  }

  /**
   * Private method used to disable the search in progress state.
   * This method sets the 'isSearching' property to false.
   * It's typically called when a search operation is completed or canceled.
   */
  private disableSearchInProgress(): void {
    this.isSearching = false;
  }

  /**
   * Private method used to enable the reset search in progress state.
   * This method sets the 'isResettingSearch' property to true.
   * It's typically called when a reset search operation starts.
   */
  private enableResetSearchInProgress(): void {
    this.isResettingSearch = true;
  }

  /**
   * Private method used to disable the reset search in progress state.
   * This method sets the 'isResettingSearch' property to false.
   * It's typically called when a reset search operation is completed or canceled.
   */
  private disableResetSearchInProgress(): void {
    this.isResettingSearch = false;
  }


  /**
   * Retrieves pagination details for the current page.
   *
   * @returns An object containing the page number and page size.
   */
  private getPaginationDetails(): AnyObject {
    return {
      pageNo: this.currentPage - 1,
      pageSize: this.pageSize
    }
  }

  /**
   * Prepares search parameters including pagination details.
   *
   * @returns An object containing search parameters.
   */
  private prepareSearchParams(): AnyObject {
    return {
      ...(this.searchParams),
      ...(this.getPaginationDetails())
    }
  }

  /**
   * Prepares a pagination token based on the current pagination action.
   *
   * @returns A PaginationToken object containing the appropriate pagination token based on the current pagination action.
   *
   * @remarks
   * - If the pagination action is 'next', the next_page_token is included in the PaginationToken object.
   * - If the pagination action is 'previous', the prev_page_token is included in the PaginationToken object.
   * - If the pagination action is neither 'next' nor 'previous', an empty object is returned.
   */
  private preparePaginationToken(): PaginationToken {
    if (this.paginationAction === 'next') {
      return { [DEFAULT_NEXT_PAGE_TOKEN_KEY] : this.nextPageToken };
    } else if (this.paginationAction === 'previous') {
      return { [DEFAULT_PREV_PAGE_TOKEN_KEY] : this.prevPageToken };
    } else {
      return {};
    }
  }

  /**
   * Moves to the next page of entries if available.
   *
   * @returns A Promise that resolves when the operation is complete.
   */
  public async nextPage(): Promise<void> {
    if (this.entries && !this.isLast && this.isNextPageAvailable()) {
      this.currentPage++;
      this.paginationAction = 'next';
      await this.handlePagination();
    }
  }

  /**
   * Moves to the previous page of entries if available.
   *
   * @returns A Promise that resolves when the operation is complete.
   */
  public async previousPage(): Promise<void> {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.paginationAction = 'previous';
      await this.handlePagination();
    }
  }

  /**
   * Handles pagination by updating the URL with the current page and retrieving entries.
   *
   * @returns A Promise that resolves when the pagination is complete.
   */
  public async handlePagination(): Promise<void> {
    // Update the URL with the current page
    await this.updateUrlWithPage();

    // Retrieve entries based on the updated page
    this.getEntries();
  }

  /**
   * Retrieves entries based on the current search parameters.
   */
  protected getEntries(cb?: Function): void {
    const id: string | null = this.route.snapshot.paramMap.get('id');

    // Prepare search parameters
    let params: AnyObject = this.prepareSearchParams();
    params = {
      ...params,
      id
    };

    removePropertiesWithBlankKeysAndValues(params);

    // Disable form submission and reset error message
    this.disableSubmittingAndResetErrorMessage();
    this.enableNavigationInProgress();

    // Find entries based on the prepared search parameters
    this.findEntries(params)
      .subscribe({
        next: (result: SearchResultView<T>): void => {
          // Initialize component properties with the search result
          this.initResult(result);
          this.invokeCallback(cb);
        },
        error: (): void => {
          // Handle error by clearing entries and enabling form submission
          this.handleError();
          this.entries = [];
          this.disableInProgressTasks();
        },
        complete: (): void => {
          // Enable form submission when search operation is complete
          this.enableSubmitting();
          this.disableInProgressTasks();
          this.disableLoading();
        }
    });
  }

  /**
   * Protected method used to disable tasks that are in progress.
   * It calls private methods to disable navigation, search, and reset search tasks in progress.
   * This method is typically called when certain tasks need to be disabled altogether.
   */
  protected disableInProgressTasks(): void {
    this.disableNavigationInProgress();
    this.disableSearchInProgress();
    this.disableResetSearchInProgress();
  }


  /**
   * Performs a search operation based on the provided payload.
   *
   * @param payload The search payload.
   * @returns A Promise that resolves when the search operation is complete.
   */
  public async search(payload: SearchPayload): Promise<void> {
    // Set the search parameters to the provided payload
    this.searchParams = payload;
    this.currentPage = 1;
    this.enableSearchInProgress();

    removePropertiesWithBlankKeysAndValues(this.searchParams);
    // Update the URL with the current page and search parameters
    await this.updateUrlWithPage(this.searchParams);
  }

  /**
   * Confirms the deletion of selected entries.
   *
   * If there are selected entries to delete and the component is not currently submitting,
   * the delete operation is initiated.
   */
  public confirmDeleteEntries(): void {
    if (this.deleteIds.length > 0 && isFalsy(this.isSubmitting)) {
      // Disable form submission and reset error message
      this.disableSubmittingAndResetErrorMessage();
      this.isDeleting = true;

      // Prepare payload with IDs of entries to delete
      const payload: DeleteIdsPayload = { ids: this.deleteIds };

      // Initiate delete operation
      this.deleteEntries(payload)
        .subscribe({
          error: (): void => {
            // Enable form submission in case of error
            this.enableSubmitting();
          },
          complete: (): void => {
            // Enable form submission and refresh entries after deletion is complete
            this.enableSubmitting();
            this.refreshEntries();
            this.resetDeleteIds();
            this.completeDeletingEntries();
          }
      });
    }
  }

  /**
   * Resets the search parameters to an empty object and navigates to the current route without any query parameters.
   * After resetting the search parameters, it triggers the `getEntries()` method to update the entries based on the new search parameters.
   * @returns A promise that resolves once the navigation is complete.
   */
  public async resetSearch(): Promise<void> {
    // Resetting the search parameters to an empty object
    this.searchParams = {};
    this.enableResetSearchInProgress();

    // Navigating to the current route without any query parameters
    // This clears any existing query parameters from the URL
    await this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { }
    });
  }


  /**
   * Refreshes the entries list by removing entries that were deleted.
   */
  private refreshEntries(): void {
    this.entries = this.entries
      .filter((entry: T) => !this.deleteIds.includes(entry[this.defaultEntryIdKey]));
  }

  protected refreshEntriesByDeletedId(): void {
    this.entries = this.entries
      .filter((entry: T): boolean => entry[this.defaultEntryIdKey] !== this.deletedId);
  }

  /**
   * Adds one to the given index.
   *
   * @param idx The index to which one is added.
   * @returns The index incremented by one.
   */
  public addOneToIndex(idx: number): number {
    return idx + 1;
  }

  /**
   * Updates the URL with the current page and additional parameters.
   *
   * @param params Additional parameters to include in the URL query string.
   * @param skipLocationChange To skip updating the browser history
   * @returns A Promise that resolves when the navigation is complete.
   */
  private async updateUrlWithPage(params: AnyObject = {}, skipLocationChange: boolean = false): Promise<void> {

    await this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page: this.currentPage, ...params, ...(this.preparePaginationToken()) },
      queryParamsHandling: 'merge',
      skipLocationChange
    });
  }

  /**
   * Initializes the component by retrieving entries based on the initial URL parameters.
   */
  protected startComponent(cb?: Function): void {
    this.route.queryParams.subscribe((params: Params): void => {
      const page = params[DEFAULT_PAGE_NO_KEY];
      this.searchParams = { ...params, ...(this.searchParams) };
      this.deleteKeyIfExists(this.searchParams, DEFAULT_PAGE_NO_KEY);
      if (page !== undefined && !isNaN(page)) {
        this.currentPage = +page;
      }
      this.getEntries(cb);
    });
  }

  /**
   * Resets the array of IDs marked for deletion.
   */
  protected resetDeleteIds(): void {
    this.deleteIds = [];
  }

  /**
   * Indicate that deleting of entries has completed
   * @protected
   */
  protected completeDeletingEntries(): void {
    this.isDeleting = false;
  }

  /**
   * Initializes the component's state based on navigation extras.
   *
   * @param navigation The navigation object containing extras.
   */
  protected initRouteState(navigation?: Navigation | null): void {
    if (isTruthy(navigation)) {
      const state: AnyObject | any = navigation?.extras?.state;
      if (isTruthy(state) && state != null && state['error']) {
        this.errorMessage = state?.['error'];
      }
    }
  }

  /**
   * Deletes a key from an object if it exists.
   *
   * @param params The object from which to delete the key.
   * @param key The key to delete from the object.
   */
  protected deleteKeyIfExists(params: AnyObject, key: string): void {
    delete params[key];
  }

  /**
   * Resets the 'entries' array by creating a shallow copy of the existing array.
   * This method can be used to trigger change detection when updating the array reference.
   */
  protected resetEntries(): void {
    this.entries = [ ...this.entries];
  }
}
