import {FormBuilder} from '@angular/forms';
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {BaseFormComponent} from "@app/base/component";
import {ErrorResponse} from "@app/model/response";
import {isFalsy, isTruthy} from "@app/shared/helper";

export abstract class BaseAddComponent<D, R> extends BaseFormComponent {

  protected constructor(protected router: Router,
                        protected formBuilder: FormBuilder) {
    super();
  }

  protected abstract initForm(): void;

  protected abstract $saveEntry(payload: D): Observable<R>;

  protected override getRouter(): Router {
    return this.router;
  }

  protected override async goToEntries(errorMessage?: string): Promise<void> {
    await super.goToEntries(errorMessage, 1);
  }

  protected saveEntry(): void {
    if (isTruthy(this.fleenForm) && this.fleenForm.valid && isFalsy(this.isSubmitting)) {
      this.disableSubmittingAndResetErrorMessage();

      this.$saveEntry(this.fleenForm.value)
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

}
