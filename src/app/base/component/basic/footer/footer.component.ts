import {Component} from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html'
})
export class FooterComponent {

  public constructor() { }

  public currentYear: number = (new Date()).getFullYear();
}
