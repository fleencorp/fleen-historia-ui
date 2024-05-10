import {Component, Input} from '@angular/core';
import {faSmile, IconDefinition} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-no-entries',
  templateUrl: './no-entries.component.html',
  styles: [
    `
        .no-entries {
          margin-top: 30px;
          text-align: center;
        }
    `
  ]
})
export class NoEntriesComponent {

  @Input() public entries: any[] = [];
  protected readonly faSmile: IconDefinition = faSmile;
}
