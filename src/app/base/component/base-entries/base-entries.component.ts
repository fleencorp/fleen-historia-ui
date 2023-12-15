import {ActivatedRoute, Navigation, Params, Router} from "@angular/router";
import {Observable} from "rxjs";
import {BaseFormComponent} from "@app/base/component";
import {Location} from "@angular/common";
import {AnyObject, DeleteIdsPayload, SearchFilter, SearchPayload} from "@app/model/type";
import {DEFAULT_PAGE_NO_KEY, DEFAULT_PAGE_SIZE} from "@app/constant";
import {SearchResultView} from "@app/model/view";
import {isFalsy, isTruthy} from "@app/shared/helper";

export abstract class BaseEntriesComponent<T> extends BaseFormComponent {

  public currentPage: number = 1;
  public pageSize: number = DEFAULT_PAGE_SIZE;
  public isFirst: boolean | undefined;
  public isLast: boolean | undefined;
  public entries: T[] = [];
  private deleteIds: Array<number | string> = [];
  private totalEntries: number = 0;
  protected searchParams: AnyObject = {};
  protected searchFilter: SearchFilter[] = [];
  protected formBuilder;

  protected constructor(protected router: Router, protected route: ActivatedRoute, protected location: Location) {
    super();
    this.initRouteState(this.router.getCurrentNavigation());
  }

  abstract findEntries(params: AnyObject): Observable<SearchResultView<T>>;

  abstract deleteEntries(payload: DeleteIdsPayload): Observable<any>;

  protected override getRouter(): Router {
    return this.router;
  }

  public trackByFn(index: number, item: any): any {
    return item.id;
  }

  public handleChecked(id: number | string, checked: boolean): void {
    if (checked && !this.deleteIds.includes(id)) {
      this.deleteIds.push(id);
    } else {
      this.deleteIds = this.deleteIds
        .filter((val: number | string) => val !== id);
    }
  }

  public async updateEntry(id: number | string | undefined): Promise<void> {
    if (isTruthy(id)) {
      await this.router.navigate(['..', 'update', id], {relativeTo: this.route});
    }
  }

  public async viewDetail(id: number | string | undefined): Promise<void> {
    if (isTruthy(id)) {
      await this.router.navigate(['..', 'detail', id], {relativeTo: this.route});
    }
  }

  private isNextPageAvailable(): boolean {
    const totalPages: number = Math.ceil( this.totalEntries / this.pageSize);
    return this.currentPage < totalPages;
  }

  private initResult(result: SearchResultView<any>): void {
    this.isFirst = result.isFirst;
    this.isLast = result.isLast;
    this.entries = result.values;
    this.totalEntries = result.totalEntries;
  }

  private getPaginationDetails(): AnyObject {
    return {
      pageNo: this.currentPage - 1,
      pageSize: this.pageSize
    }
  }

  private prepareSearchParams(): AnyObject {
    return {
      ...(this.searchParams),
      ...(this.getPaginationDetails())
    }
  }

  public async nextPage(): Promise<void> {
    if (this.entries && !this.isLast && this.isNextPageAvailable()) {
      this.currentPage++;
      await this.updateUrlWithPage();
      this.getEntries();
    }
  }

  public async previousPage(): Promise<void> {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.getEntries();
    }
  }

  protected getEntries(): void {
    const params: AnyObject = this.prepareSearchParams();
    this.disableSubmittingAndResetErrorMessage();
    this.findEntries(params)
      .subscribe({
        next: (result: SearchResultView<T>): void => {
          this.initResult(result);
        },
        error: (): void => {
          this.entries = [];
          this.enableSubmitting();
        },
        complete: (): void => {
          this.enableSubmitting();
        }
    });
  }

  public async search(payload: SearchPayload): Promise<void> {
    this.searchParams = payload;
    await this.updateUrlWithPage(this.searchParams);
    this.getEntries();
  }

  public confirmDeleteEntries(): void {
    if (this.deleteIds.length > 0 && isFalsy(this.isSubmitting)) {
      this.disableSubmittingAndResetErrorMessage();

      const payload: DeleteIdsPayload = { ids: this.deleteIds };
      this.deleteEntries(payload)
        .subscribe({
          error: (): void => {
            this.enableSubmitting();
          },
          complete: (): void => {
            this.enableSubmitting();
            this.refreshEntries();
            this.resetDeleteIds();
          }
      });
    }
  }

  private refreshEntries(): void {
    this.entries = this.entries
      .filter((entry: T) => !this.deleteIds.includes(entry['id']))
  }

  public addOneToIndex(idx: number): number {
    return idx + 1;
  }

  private async updateUrlWithPage(params: AnyObject = {}): Promise<void> {
    await this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page: this.currentPage, ...params },
      queryParamsHandling: 'merge',
    })
  }

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

  protected resetDeleteIds(): void {
    this.deleteIds = [];
  }

  protected initRouteState(navigation?: Navigation | null): void {
    if (isTruthy(navigation)) {
      const state: AnyObject | any = navigation?.extras?.state;
      if (isTruthy(state) && state != null && state['error']) {
        this.errorMessage = state?.['error'];
      }
    }
  }

  protected deleteKeyIfExists(params: AnyObject, key: string): void {
    delete params[key];
  }
}
