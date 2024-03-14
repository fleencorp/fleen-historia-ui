import {BaseFormComponent} from "@app/base/component";
import {Router} from "@angular/router";
import {FormBuilder} from "@angular/forms";
import {ANY_EMPTY} from "@app/constant";

export abstract class BaseFormImplComponent extends BaseFormComponent {

  protected formBuilder!: FormBuilder;

  protected override getRouter(): Router {
    return ANY_EMPTY;
  }

}
