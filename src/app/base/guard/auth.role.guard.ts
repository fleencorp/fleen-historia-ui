import {inject, Injectable} from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import {AuthTokenService} from "@app/base/service";
import {Observable} from "rxjs";
import {FORBIDDEN_ROUTE} from "@app/config";

/**
 * A guard service to protect routes based on the user's role.
 * It implements CanActivate interface to determine if a route can be activated.
 */
@Injectable()
export class AuthRoleGuardService implements CanActivate {

  /**
   * Constructor to inject dependencies.
   * @param tokenService - Service to manage authentication tokens.
   * @param router - Angular router service for navigation.
   */
  public constructor(private tokenService: AuthTokenService, private router: Router) { }

  /**
   * Method to determine if a route can be activated based on the user's role.
   * @param route - The activated route snapshot.
   * @param state - The router state snapshot.
   * @returns An observable, promise, or boolean indicating whether the route can be activated.
   */
  public canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (this.isAdmin) {
      return true;
    } else {
      this.router.navigate([FORBIDDEN_ROUTE])
        .then((x: boolean) => x);
      return false;
    }
  }

  /**
   * Method to check if the user is an admin.
   * @returns A boolean indicating whether the user is an admin.
   */
  get isAdmin(): boolean {
    return this.tokenService.isAdmin();
  }
}


/**
 * A factory function to provide the AuthRoleGuardService as a guard.
 * @param next - The activated route snapshot.
 * @param state - The router state snapshot.
 * @returns An observable, promise, or boolean indicating whether the route can be activated.
 */
export const AuthRoleGuard: CanActivateFn = (
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree => {
  return inject(AuthRoleGuardService).canActivate(next, state);
};
