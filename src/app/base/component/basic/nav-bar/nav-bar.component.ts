import {Component} from '@angular/core';
import {
  faBars,
  faDashboard,
  faHome,
  faPlus,
  faSignIn,
  faSignOut,
  faSpinner,
  faUser,
  faVideo,
  IconDefinition
} from "@fortawesome/free-solid-svg-icons";
import {AuthenticationService} from "@app/feature/authentication/service";
import {AuthTokenService} from "@app/base/service";
import {BaseComponent} from "@app/base/component";
import {ActivatedRoute, Router} from "@angular/router";
import {ANY_EMPTY} from "@app/constant";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent extends BaseComponent {

  public isSigningOut: boolean | undefined;

  public constructor(
      protected authenticationService: AuthenticationService,
      protected tokenService: AuthTokenService,
      protected router: Router) {
    super();
  }

  protected override getRouter(): Router {
    return this.router;
  }

  protected override getRoute(): ActivatedRoute {
    return ANY_EMPTY;
  }

  protected override initDetails(): void {}

  get isAuthenticated(): boolean {
    return this.authenticationService.isAuthenticated();
  }

  get isUnauthenticated(): boolean {
    return !(this.authenticationService.isAuthenticated());
  }

  protected enableIsSigningOut(): void {
    this.isSigningOut = true;
  }

  protected disableIsSigningOut(): void {
    this.isSigningOut = false;
  }

  public signOut(event): void {
    this.stopEvent(event);
    this.enableIsSigningOut();

    this.authenticationService.signOut()
      .subscribe({
        next: async (): Promise<void> => { await this.afterSignOut(); },
        error: async (): Promise<void> => { await this.afterSignOut(); },
    });
  }

  public async afterSignOut(): Promise<void> {
    this.tokenService.clearAuthTokens();
    this.disableIsSigningOut();
    await this.goHome();
  }

  protected readonly faHome: IconDefinition = faHome;
  protected readonly faUser: IconDefinition = faUser;
  protected readonly faVideo: IconDefinition = faVideo;
  protected readonly faDashboard: IconDefinition = faDashboard;
  protected readonly faSignOut: IconDefinition = faSignOut;
  protected readonly faSignIn: IconDefinition = faSignIn;
  protected readonly faPlus: IconDefinition = faPlus;
  protected readonly faBars: IconDefinition = faBars;
  protected readonly faSpinner: IconDefinition = faSpinner;
}
