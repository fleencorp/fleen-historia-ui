import {Component} from '@angular/core';
import {
  faBars,
  faDashboard,
  faHome,
  faPlus,
  faSignIn,
  faSignOut, faSpinner,
  faUser,
  faVideo,
  IconDefinition
} from "@fortawesome/free-solid-svg-icons";
import {AuthenticationService} from "@app/feature/authentication/service";
import {AuthTokenService} from "@app/base/service";
import {BaseComponent} from "@app/base/component";
import {Router} from "@angular/router";

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

  get isAuthenticated(): boolean {
    return this.authenticationService.isAuthenticated();
  }

  get isUnauthenticated(): boolean {
    return !(this.authenticationService.isAuthenticated());
  }

  public signOut(event): void {
    this.stopEvent(event);
    this.isSigningOut = true;

    this.authenticationService.signOut()
      .subscribe({
        complete: async (): Promise<void> => {
          this.tokenService.clearAuthTokens();
          await this.goHome();
        }
    });
  }

  protected readonly faHome: IconDefinition = faHome;
  protected readonly faUser: IconDefinition = faUser;
  protected readonly faVideo: IconDefinition = faVideo;
  protected readonly faDashboard: IconDefinition = faDashboard;
  protected readonly faSignOut: IconDefinition = faSignOut;
  protected readonly faSignIn: IconDefinition = faSignIn;
  protected readonly faPlus: IconDefinition = faPlus;
  protected readonly faBars: IconDefinition = faBars;
  protected readonly faSpinner = faSpinner;
}
