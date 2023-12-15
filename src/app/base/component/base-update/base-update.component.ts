import {BaseFormComponent} from "../base-form/base-form.component";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {Observable} from "rxjs";
import {isFalsy, isTruthy} from "../../../shared/helper";
import {ErrorResponse} from "../../../model/response";

export abstract class BaseUpdateComponent<T, D> extends BaseFormComponent {

  public abstract entryView: T;
  protected entryId: number | string = 0;

  protected constructor(protected router: Router,
                        protected route: ActivatedRoute) {
    super();
  }

  protected abstract getServiceEntry(id: number | string): Observable<T>;

  protected abstract initForm(): void;

  protected initDetails(): void {

  }

  protected abstract $updateEntry(id: string | number, payload: D): Observable<T>;

  public initEntry(): void {
    this.route.paramMap.subscribe(async (params: ParamMap): Promise<void> => {
      const id: number | string | null | any = params?.get('id');
      if (isNaN(id)) {
        await this.goToEntries();
        return;
      }
      this.entryId = id;
      this.getEntry(id);
    });
  }

  protected getEntry(id: number | string): void {
    this.getServiceEntry(id)
      .subscribe({
        next: (result: T): void => {
          this.entryView = result;
          this.initForm();
          this.initDetails();
        },
        error: async (error: ErrorResponse): Promise<void> => {
          await this.goToEntries(error.message)
          return;
        }
    });
  }

  public updateEntry(): void {
    if (isTruthy(this.fleenForm) && this.fleenForm.valid && isFalsy(this.isSubmitting)) {
      this.disableSubmittingAndResetErrorMessage();

      this.$updateEntry(this.entryId, this.fleenForm.value)
        .subscribe({
          error: (result: ErrorResponse): void => {
            this.handleError(result);
          },
          complete: async (): Promise<void> => {
            this.enableSubmitting();
            await this.goToEntries();
          }
      });
    }
  }

  protected override getRouter(): Router {
    return this.router;
  }

}
