import {Component} from '@angular/core';
import {Router} from "@angular/router";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public constructor(private router: Router) {}

  get isHomepageRouteActive(): boolean {
    // Check if the current route matches the homepage or base route
    return this.router.url === '/';
  }

}
