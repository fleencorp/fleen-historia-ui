import {BaseComponent} from "@app/base/component";
import {ActivatedRoute, Router} from "@angular/router";
import {ANY_EMPTY} from "@app/constant";

export class BaseComponentImpl extends BaseComponent {

  protected override getRouter(): Router {
    return ANY_EMPTY;
  }

  protected override getRoute(): ActivatedRoute {
    return ANY_EMPTY;
  }

  protected initDetails(): void {
    return ANY_EMPTY;
  }
}
