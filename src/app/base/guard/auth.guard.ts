import {inject, Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthenticationService} from "@app/feature/authentication/service/authentication.service";
import {SessionStorageService} from "../service";
import {AUTHENTICATION_ENTRY_POINT} from "@app/config";
import {USER_DESTINATION_PAGE_KEY} from "@app/constant";

@Injectable()
export class AuthGuardService {

  public constructor(private authenticationService: AuthenticationService,
                     private sessionStorageService: SessionStorageService,
                     private router: Router) { }

  public canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.isAuthenticated()) {
      return true;
    } else {
      this.saveUserDestinationPage(state);
      return this.router.createUrlTree([AUTHENTICATION_ENTRY_POINT]);
    }
  }

  public isAuthenticated(): boolean {
    return this.authenticationService.isAuthenticationStatusCompleted();
  }

  public saveUserDestinationPage(state: RouterStateSnapshot): void {
    this.sessionStorageService.setObject(USER_DESTINATION_PAGE_KEY, state.url);
  }
}

export const AuthGuard: CanActivateFn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree => {
  return inject(AuthGuardService).canActivate(next, state);
}
