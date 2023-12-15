import {Observable} from "rxjs";
import {BaseFormComponent} from "@app/base/component";
import {CountAllResponse, DeleteResponse} from "@app/model/response/common";
import {isFalsy, isTruthy} from "@app/shared/helper";
import {ErrorResponse} from "@app/model/response";

export abstract class BaseEntriesDeleteAllComponent extends BaseFormComponent {
  public isEntriesAvailable: boolean = false;

  protected abstract serviceCountAll(): Observable<CountAllResponse>;

  protected abstract serviceDeleteAll(): Observable<DeleteResponse>;

  public countAll(): void {
    this.serviceCountAll().subscribe({
      next: (result: CountAllResponse): void => {
        if (isTruthy(result.total)) {
          this.isEntriesAvailable = true;
        }
      },
      error: (error: ErrorResponse): void => {
        this.handleError(error);
      }
    });
  }

  public async deleteAll(): Promise<void> {
    if (isFalsy(this.isSubmitting)) {
      this.disableSubmittingAndResetErrorMessage();

      this.serviceDeleteAll().subscribe({
        error: (error: ErrorResponse): void => {
          this.handleError(error);
        },
        complete: (): void => {
          this.goToEntries(null, 1);
        }
      });
    }
  }
}
