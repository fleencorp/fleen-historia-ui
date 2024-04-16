import {TestBed} from '@angular/core/testing';
import {ActivatedRouteSnapshot, Router, RouterModule, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {FORBIDDEN_ROUTE} from "@app/config";
import {AuthRoleGuardService} from "@app/base/guard";
import {AuthTokenService} from "@app/base/service";

describe('AuthRoleGuardService', (): void => {
  let service: AuthRoleGuardService;
  let router: Router;
  let tokenServiceSpy: jasmine.SpyObj<AuthTokenService>;

  beforeEach((): void => {
    const tokenServiceSpyObj = jasmine.createSpyObj('AuthTokenService', ['isAdmin']);
    TestBed.configureTestingModule({
      imports: [RouterModule.forRoot([])],
      providers: [
        AuthRoleGuardService,
        { provide: AuthTokenService, useValue: tokenServiceSpyObj }
      ]
    });

    service = TestBed.inject(AuthRoleGuardService);
    router = TestBed.inject(Router);
    tokenServiceSpy = TestBed.inject(AuthTokenService) as jasmine.SpyObj<AuthTokenService>;
  });

  it('should be created', (): void => {
    expect(service).toBeTruthy();
  });

  it('should allow access for admin', (): void => {
    // Stub isAdmin method to return true
    tokenServiceSpy.isAdmin.and.returnValue(true);
    const routeSnapshot: ActivatedRouteSnapshot = {} as ActivatedRouteSnapshot;
    const routerStateSnapshot: RouterStateSnapshot = {} as RouterStateSnapshot;

    // Call canActivate method and expect it to return true
    const canActivateResult: Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree =
      service.canActivate(routeSnapshot, routerStateSnapshot);
    expect(canActivateResult).toBe(true);
  });

  it('should deny access for non-admin and navigate to forbidden route', (): void => {
    // Stub isAdmin method to return false
    tokenServiceSpy.isAdmin.and.returnValue(false);
    const routeSnapshot: ActivatedRouteSnapshot = {} as ActivatedRouteSnapshot;
    const routerStateSnapshot: RouterStateSnapshot = {} as RouterStateSnapshot;

    // Spy on router navigate method
    const navigateSpy: jasmine.Spy<any> = spyOn(router, 'navigate').and.returnValue(Promise.resolve(true));

    // Call canActivate method
    const canActivateResult: Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree =
      service.canActivate(routeSnapshot, routerStateSnapshot);
    expect(canActivateResult).toBe(false);

    // Expect router navigate method to be called with forbidden route
    expect(navigateSpy).toHaveBeenCalledWith([FORBIDDEN_ROUTE]);
  });
});
