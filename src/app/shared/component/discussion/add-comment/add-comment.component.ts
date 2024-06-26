import {Component, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core';
import {FormControl} from "@angular/forms";
import {faComment, IconDefinition} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AddCommentComponent {

  @Input() public content!: FormControl
  @Input('is-submitting-comment') public isSubmittingComment: boolean = false;
  @Input('is-submitting-comment-successful') public isSubmittingCommentSuccessful: boolean = false;
  @Input('comment-form-status-message') public commentFormStatusMessage: string = '';
  @Input('comment-form-error-message') public commentFormErrorMessage: string = '';

  @Output('submitting-comment') public submitComment: EventEmitter<any> = new EventEmitter<any>();

  public constructor() { }

  public addComment(): void {
    this.submitComment.emit();
  }

  public readonly faComment: IconDefinition = faComment;
}
