import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-form-message',
  templateUrl: './form-message.component.html',
  styleUrls: ['./form-message.component.css']
})
export class FormMessageComponent {

  @Input('status-message') public statusMessage: string = '';
  @Input('error-message') public errorMessage: string = '';
}
