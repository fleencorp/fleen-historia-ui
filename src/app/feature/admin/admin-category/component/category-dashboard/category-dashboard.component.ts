import {Component} from '@angular/core';
import {AuthTokenService} from "@app/base/service";
import {faList, IconDefinition} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-category-dashboard',
  templateUrl: './category-dashboard.component.html',
  styleUrls: ['./category-dashboard.component.css']
})
export class CategoryDashboardComponent {

  public constructor(protected tokenService: AuthTokenService) {}

  get profilePhoto(): string {
    return this.tokenService.getProfilePhoto();
  }

  protected readonly faList: IconDefinition = faList;
}
