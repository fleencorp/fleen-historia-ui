import {ActivatedRoute, Router} from "@angular/router";
import {BaseUpdateComponent} from "../base-update/base-update.component";
import {Observable, of} from "rxjs";
import {ANY_EMPTY} from "@app/constant";

/**
 * Abstract base class for components responsible for displaying details of an entry.
 * Inherits from BaseUpdateComponent.
 * @template T The type of the entry being displayed.
 */
export abstract class BaseDetailComponent<T> extends BaseUpdateComponent<T, any> {

  /**
   * Constructor of the BaseDetailComponent.
   * @param router The Router instance used for navigation.
   * @param route The ActivatedRoute instance providing access to route parameters.
   */
  protected constructor(router: Router, route: ActivatedRoute) {
    super(router, route);
  }

  /**
   * Overrides the initForm method from the base class.
   * No form initialization is performed in the detail component.
   */
  protected override initForm(): void { }

  /**
   * Overrides the $updateEntry method from the base class.
   * This method returns an Observable of type T with an empty value.
   * @param id The ID of the entry to be updated.
   * @param payload The data payload used to update the entry (not used in detail component).
   * @returns An Observable of type T with an empty value.
   */
  protected override $updateEntry(id: string | number, payload: any): Observable<T> {
    return of(ANY_EMPTY);
  }
}
