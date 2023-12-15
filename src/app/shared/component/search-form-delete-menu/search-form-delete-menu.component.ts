import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup} from "@angular/forms";
import {enumTypeValidator, typeValidator} from "../../validator/validator";
import {createBetweenDateObj, getPropsValueAsArray, isFalsy, propExists} from "../../helper";
import {BaseFormComponent} from "../../../base/component";
import {Router} from "@angular/router";
import {AnyObject, SearchFilter, SearchParamPayload, SearchPayload} from "../../../model/type";
import {BETWEEN_DATE_SEARCH_KEY} from "../../../constant/search.const";
import {ANY_EMPTY} from "../../../constant";

@Component({
  selector: 'app-search-form-delete-menu',
  templateUrl: './search-form-delete-menu.component.html',
  styleUrls: ['./search-form-delete-menu.component.css']
})
export class SearchFormDeleteMenuComponent extends BaseFormComponent implements OnInit {

  public searchParams: AnyObject = {};
  public searchForm: FormGroup = new FormGroup<any>({});
  @Input('is-submitting') public override isSubmitting: boolean = false;
  @Input('search-filter') public searchFilter: SearchFilter[] = [];
  @Output() public searchSubmitted: EventEmitter<SearchPayload> = new EventEmitter<SearchPayload>();
  @Output() public deleteConfirmed: EventEmitter<void> = new EventEmitter<void>();

  public constructor(protected formBuilder: FormBuilder) {
    super();
  }

  public ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.searchForm = this.formBuilder.group({
      searchType: ['', [enumTypeValidator(getPropsValueAsArray(this.searchFilter, 'key'))] ],
      searchInput: ['', [] ],
    }, {
      validators: [typeValidator(['searchType', 'searchInput'], this.searchFilter)]
    });
  }

  public search(): void {
    if (this.searchForm.valid && isFalsy(this.isSubmitting)) {
      this.disableSubmittingAndResetErrorMessage();
      const { type, value } = this.searchFormValue;
      this.searchParams = {[type]: value};
      this.checkBetweenDateParam();
      this.searchSubmitted.emit({ ...(this.searchParams) });
    }
  }

  public confirmDeleteEntries(): void {
    this.deleteConfirmed.emit();
  }

  get searchType(): AbstractControl | null | undefined {
    return this.searchForm.get('searchType');
  }

  get searchInput(): AbstractControl | null | undefined {
    return this.searchForm.get('searchInput');
  }

  get searchFormValue(): SearchParamPayload {
    const type: string = this.searchType?.value;
    const value: string = this.searchInput?.value;
    return { type, value };
  }

  public checkBetweenDateParam(): void {
    if (propExists(this.searchParams, BETWEEN_DATE_SEARCH_KEY)) {
      const twoDates: AnyObject = createBetweenDateObj(this.searchParams[BETWEEN_DATE_SEARCH_KEY]);
      this.searchParams = { ...(this.searchParams), ...twoDates };
      delete this.searchParams[BETWEEN_DATE_SEARCH_KEY];
    }
  }

  protected override getRouter(): Router {
    return ANY_EMPTY;
  }
}
