import {ErrorResponse} from "@app/model/response";
import {DEFAULT_ERROR_MESSAGE, ERR_CONNECTION_REFUSED_MESSAGE} from "@app/constant";

export abstract class BaseComponent {

  protected errorMessage: string = '';
  public isLoading: boolean = false;
  protected readonly LOADING_SPINNER_DELAY: number = 4000;

  protected handleError(error: ErrorResponse): void {
    this.errorMessage = error?.message || '';
    if (this.errorMessage.includes(ERR_CONNECTION_REFUSED_MESSAGE)) {
      this.errorMessage = DEFAULT_ERROR_MESSAGE;
    }
  }

  protected enableLoading(): void {
    this.isLoading = true;
  }

  protected disableLoading(): void {
    this.isLoading = false;
  }

  get canDisplay(): boolean {
    return !this.isLoading;
  }
}
