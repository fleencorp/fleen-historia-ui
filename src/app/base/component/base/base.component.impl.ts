import {BaseComponent} from "@app/base/component";
import {Router} from "@angular/router";
import {ANY_EMPTY} from "@app/constant";

export class BaseComponentImpl extends BaseComponent {

  protected override getRouter(): Router {
    return ANY_EMPTY;
  }
}
