import {Component, Input} from '@angular/core';
import {faArrowRight, faSpinner, IconDefinition} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-submit-loading-icon',
  templateUrl: './submit-loading-icon.component.html',
  styles: [
    `
      :host {
        display: contents;
      }
    `
  ]
})
export class SubmitLoadingIconComponent {

  protected readonly faSpinner: IconDefinition = faSpinner;
  protected readonly faArrowRight:IconDefinition = faArrowRight;

  @Input('is-submitting')
  public isSubmitting: boolean = false;
}
