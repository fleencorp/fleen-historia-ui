import {ActivatedRoute, Navigation, Params, Router} from "@angular/router";
import {Observable} from "rxjs";
import {BaseFormComponent} from "@app/base/component";
import {Location} from "@angular/common";
import {AnyObject, DeleteIdsPayload, SearchFilter, SearchPayload} from "@app/model/type";
import {DEFAULT_PAGE_NO_KEY, DEFAULT_PAGE_SIZE} from "@app/constant";
import {SearchResultView} from "@app/model/view";
import {isFalsy, isTruthy} from "@app/shared/helper";

/**
 * Base abstract class for components dealing with paginated entries.
 *
 * @template T The type of entries managed by the component.
 *
 * @author Yusuf Alamu Musa
 * @version 1.0
 */
export abstract class BaseEntriesComponent<T> extends BaseFormComponent {

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
   * The form builder instance.
   */
  protected formBuilder;

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
        .filter((val: number | string) => val !== id);
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
    this.entries = result.values;
    this.totalEntries = result.totalEntries;
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
   * Moves to the next page of entries if available.
   *
   * @returns A Promise that resolves when the operation is complete.
   */
  public async nextPage(): Promise<void> {
    if (this.entries && !this.isLast && this.isNextPageAvailable()) {
      this.currentPage++;
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
  protected getEntries(): void {
    // Prepare search parameters
    const params: AnyObject = this.prepareSearchParams();

    // Disable form submission and reset error message
    this.disableSubmittingAndResetErrorMessage();

    // Find entries based on the prepared search parameters
    this.findEntries(params)
      .subscribe({
        next: (result: SearchResultView<T>): void => {
          // Initialize component properties with the search result
          this.initResult(result);
        },
        error: (): void => {
          // Handle error by clearing entries and enabling form submission
          this.entries = [];
          this.enableSubmitting();
        },
        complete: (): void => {
          // Enable form submission when search operation is complete
          this.enableSubmitting();
        }
      });
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

    // Update the URL with the current page and search parameters
    await this.updateUrlWithPage(this.searchParams);

    // Retrieve entries based on the updated search parameters
    this.getEntries();
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
          }
        });
    }
  }

  /**
   * Refreshes the entries list by removing entries that were deleted.
   */
  private refreshEntries(): void {
    this.entries = this.entries
      .filter((entry: T) => !this.deleteIds.includes(entry['id']))
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
   * @returns A Promise that resolves when the navigation is complete.
   */
  private async updateUrlWithPage(params: AnyObject = {}): Promise<void> {
    await this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page: this.currentPage, ...params },
      queryParamsHandling: 'merge',
    })
  }

  /**
   * Initializes the component by retrieving entries based on the initial URL parameters.
   */
  protected startComponent(): void {
    this.route.queryParams.subscribe((params: Params): void => {
      const page = params[DEFAULT_PAGE_NO_KEY];
      this.searchParams = { ...params };
      this.deleteKeyIfExists(this.searchParams, DEFAULT_PAGE_NO_KEY);
      if (page !== undefined && !isNaN(page)) {
        this.currentPage = +page;
      }
      this.getEntries();
    });
  }

  /**
   * Resets the array of IDs marked for deletion.
   */
  protected resetDeleteIds(): void {
    this.deleteIds = [];
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
}
