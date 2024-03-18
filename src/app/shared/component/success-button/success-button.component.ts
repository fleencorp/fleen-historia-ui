import {Component, Input} from '@angular/core';
import {faCheck, IconDefinition} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-success-button',
  template: `
    <button id="auth-code-status-btn" *ngIf="isFormCompleted" >Success <fa-icon [icon]="faCheck"></fa-icon></button>
  `,
  styles: [
    `
    :host {
      display: contents;
    }
  `
  ]
})
export class SuccessButtonComponent {
  @Input('is-form-completed')
  isFormCompleted: boolean = false;

  protected readonly faCheck: IconDefinition = faCheck;
}
