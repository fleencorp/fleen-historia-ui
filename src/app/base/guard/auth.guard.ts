import {inject, Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthenticationService} from "@app/feature/authentication/service/authentication.service";
import {SessionStorageService} from "../service";
import {AUTHENTICATION_ENTRY_POINT} from "@app/config";
import {USER_DESTINATION_PAGE_KEY} from "@app/constant";

@Injectable()
/**
 * AuthGuardService is a service that implements the CanActivate interface to protect routes
 * based on the authentication status.
 *
 * @author Yusuf Alamu Musa
 * @version 1.0
 */
export class AuthGuardService {

  /**
   * Constructor for AuthGuardService.
   * @param authenticationService - The authentication service.
   * @param sessionStorageService - The session storage service.
   * @param router - The router service.
   */
  public constructor(
    private authenticationService: AuthenticationService,
    private sessionStorageService: SessionStorageService,
    private router: Router
  ) { }

  /**
   * The CanActivate method is used to determine if a route can be activated based on authentication status.
   * @param route - The activated route snapshot.
   * @param state - The router state snapshot.
   * @returns An observable, promise, boolean, or UrlTree indicating whether the route can be activated.
   */
  public canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.isAuthenticated()) {
      return true;
    } else {
      this.saveUserDestinationPage(state);
      console.log('Destination page' , this.sessionStorageService.getObject(USER_DESTINATION_PAGE_KEY));
      return this.router.createUrlTree([AUTHENTICATION_ENTRY_POINT]);
    }
  }

  /**
   * Checks if the user is authenticated.
   * @returns A boolean indicating the authentication status.
   */
  public isAuthenticated(): boolean {
    return this.authenticationService.isAuthenticationStatusCompleted();
  }

  /**
   * Saves the user's destination page in session storage.
   * @param state - The router state snapshot.
   */
  public saveUserDestinationPage(state: RouterStateSnapshot): void {
    this.sessionStorageService.setObject(USER_DESTINATION_PAGE_KEY, state.url);
  }
}

/**
 * AuthGuard is a function that serves as a shorthand for injecting and calling AuthGuardService.canActivate.
 *
 * @author Yusuf Alamu Musa
 * @version 1.0
 */
export const AuthGuard: CanActivateFn = (
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree => {
  return inject(AuthGuardService).canActivate(next, state);
};
