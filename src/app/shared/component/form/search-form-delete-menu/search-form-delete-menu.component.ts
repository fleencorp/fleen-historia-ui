import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup} from "@angular/forms";
import {enumTypeValidator, typeValidator} from "@app/shared/validator";
import {createBetweenDateObj, getPropsValueAsArray, isFalsy, propExists} from "@app/shared/helper";
import {BaseFormComponent} from "@app/base/component";
import {Router} from "@angular/router";
import {AnyObject, SearchFilter, SearchParamPayload, SearchPayload} from "@app/model/type";
import {BETWEEN_DATE_SEARCH_KEY} from "@app/constant/search.const";
import {ANY_EMPTY} from "@app/constant";
import {faSearch, faSpinner, faTrash, IconDefinition} from "@fortawesome/free-solid-svg-icons";

/**
 * Component for displaying a search form with delete menu functionality.
 */
@Component({
  selector: 'app-search-form-delete-menu',
  templateUrl: './search-form-delete-menu.component.html',
  styleUrls: ['./search-form-delete-menu.component.css']
})
export class SearchFormDeleteMenuComponent extends BaseFormComponent implements OnInit {

  /** Object representing search parameters. */
  @Input('search-params')
  public searchParams: AnyObject = {};

  /** Form group for the search form. */
  public searchForm: FormGroup = new FormGroup<any>({});

  /** Boolean indicating if the component is in a submitting state. */
  @Input('is-submitting')
  public override isSubmitting: boolean = false;

  /** Array of search filter options. */
  @Input('search-filter')
  public searchFilter: SearchFilter[] = [];

  /** Event emitter for submitting a search. */
  @Output()
  public searchSubmitted: EventEmitter<SearchPayload> = new EventEmitter<SearchPayload>();

  /** Event emitter for confirming deletion. */
  @Output()
  public deleteConfirmed: EventEmitter<void> = new EventEmitter<void>();

  /** Event emitter for resetting a search. */
  @Output()
  public resetSearchSubmitted: EventEmitter<boolean> = new EventEmitter();

  @Input('is-deleting')
  public isDeleting: boolean | undefined;

  @Input('is-searching')
  public override isSearching: boolean | undefined;

  @Input('is-resetting-search')
  public override isResettingSearch: boolean | undefined;

  @Input('can-delete')
  public canDelete: boolean | undefined = true

  /**
   * Constructor of the component.
   *
   * @param formBuilder The FormBuilder instance for building the form.
   */
  public constructor(protected formBuilder: FormBuilder) {
    super();
  }

  /**
   * Initializes the component.
   */
  public ngOnInit(): void {
    this.initForm();
  }

  /**
   * Initializes the search form with appropriate form controls and validators.
   */
  private initForm(): void {
    this.searchForm = this.formBuilder.group({
      searchType: ['', [enumTypeValidator(getPropsValueAsArray(this.searchFilter, 'key'))] ],
      searchInput: ['', [] ],
    }, {
      validators: [typeValidator(['searchType', 'searchInput'], this.searchFilter)]
    });

    this.getMatchingSearchParams();
  }

  /**
   * Iterates through each filter in `searchFilter` and checks if any of the keys exist in `searchParams`.
   * If a matching key is found, updates the corresponding form control values with the key and its value from `searchParams`.
   */
  private getMatchingSearchParams(): void {
    // Iterate through each filter in searchFilter
    for (const filter of this.searchFilter) {
      // Check if the key exists in searchParams
      if (this.searchParams.hasOwnProperty(filter.key)) {
        // If the key exists, update the form control values with the key and its value from searchParams
        this.searchType?.patchValue(filter.key); // Assuming searchType is a FormControl
        this.searchInput?.patchValue(this.searchParams[filter.key]); // Assuming searchInput is a FormControl
        break; // Exit the loop after finding the first matching key
      }
    }
  }


  /**
   * Initiates the search process if the form is valid and not in a submitting state.
   *
   * Emits the search parameters through the `searchSubmitted` event.
   */
  public search(): void {
    if (this.searchForm.valid && isFalsy(this.isSubmitting)) {
      // Disable form submission and reset error message
      this.disableSubmittingAndResetErrorMessage();

      // Extract type and value from form
      const { type, value } = this.searchFormValue;

      // Set search parameters
      this.searchParams = { ...(this.searchParams), [type]: value };

      // Check if the search includes a 'between date' parameter
      this.checkBetweenDateParam();

      // Emit the search parameters
      this.searchSubmitted.emit({ ...(this.searchParams), q: value });
    }
  }

  /**
   * Initiates the deletion process by emitting the `deleteConfirmed` event.
   */
  public confirmDeleteEntries(): void {
    this.deleteConfirmed.emit();
  }

  /**
   * Initiates the process for resetting a search.
   */
  public confirmResetSearch(): void {
    this.searchType?.reset();
    this.searchInput?.reset();
    this.resetSearchSubmitted.emit();
  }

  /**
   * Returns the FormControl for the search type input in the search form.
   *
   * @returns The FormControl for the search type input.
   */
  get searchType(): AbstractControl | null | undefined {
    return this.searchForm.get('searchType');
  }

  /**
   * Returns the FormControl for the search input in the search form.
   *
   * @returns The FormControl for the search input.
   */
  get searchInput(): AbstractControl | null | undefined {
    return this.searchForm.get('searchInput');
  }

  /**
   * Retrieves the current value of the search form.
   *
   * @returns An object containing the type and value of the search.
   */
  get searchFormValue(): SearchParamPayload {
    const type: string = this.searchType?.value;
    const value: string = this.searchInput?.value;
    return { type, value };
  }

  /**
   * Checks if the search parameters contain a 'between date' parameter.
   * If found, it creates two date parameters from the 'between date' parameter
   * and updates the search parameters accordingly.
   */
  public checkBetweenDateParam(): void {
    if (propExists(this.searchParams, BETWEEN_DATE_SEARCH_KEY)) {
      // Create two date parameters from the 'between date' parameter
      const twoDates: AnyObject = createBetweenDateObj(this.searchParams[BETWEEN_DATE_SEARCH_KEY]);

      // Update the search parameters
      this.searchParams = { ...(this.searchParams), ...twoDates };

      // Remove the 'between date' parameter
      delete this.searchParams[BETWEEN_DATE_SEARCH_KEY];
    }
  }

  /**
   * Overrides the base class method to return an empty router instance.
   *
   * @returns An empty Router instance.
   */
  protected override getRouter(): Router {
    return ANY_EMPTY;
  }

  protected readonly faTrash: IconDefinition = faTrash;
  protected readonly faSearch: IconDefinition = faSearch;
  protected readonly faSpinner: IconDefinition = faSpinner;
}
