import {BaseFormComponent} from "./base-form.component";
import {Router} from "@angular/router";
import {FormBuilder} from "@angular/forms";
import {ANY_EMPTY} from "../../../constant";

export abstract class BaseFormImplComponent extends BaseFormComponent {

  protected formBuilder!: FormBuilder;

  protected override getRouter(): Router {
    return ANY_EMPTY;
  }

}
