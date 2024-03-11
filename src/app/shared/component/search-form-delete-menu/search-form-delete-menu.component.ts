import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup} from "@angular/forms";
import {enumTypeValidator, typeValidator} from "../../validator/custom";
import {createBetweenDateObj, getPropsValueAsArray, isFalsy, propExists} from "../../helper";
import {BaseFormComponent} from "../../../base/component";
import {Router} from "@angular/router";
import {AnyObject, SearchFilter, SearchParamPayload, SearchPayload} from "../../../model/type";
import {BETWEEN_DATE_SEARCH_KEY} from "../../../constant/search.const";
import {ANY_EMPTY} from "../../../constant";

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
      this.searchParams = { [type]: value };

      // Check if the search includes a 'between date' parameter
      this.checkBetweenDateParam();

      // Emit the search parameters
      this.searchSubmitted.emit({ ...(this.searchParams) });
    }
  }

  /**
   * Initiates the deletion process by emitting the `deleteConfirmed` event.
   */
  public confirmDeleteEntries(): void {
    this.deleteConfirmed.emit();
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
}
