import {ReplyState} from "@app/model/type";
import {FormControl} from "@angular/forms";
import {maxLength, required} from "@app/shared/validator";

export const defaultReplyState: ReplyState = {
  showForm: false,
  isSubmitting: false,
  isSubmittingSuccessful: false,
  message: '',
  errorMessage: '',
  replyContent: new FormControl<any>('', [required, maxLength(3000)]),
  clearMessages: function (): void {
    this.message = '';
    this.errorMessage = '';
  },
  hideForm: function (): void {
    this.showForm = false;
  },
  enableSubmitting: function (): void {
    this.isSubmitting = false;
  },
  disableSubmitting: function (): void {
    this.isSubmitting = true;
  },
  enableIsSubmittingSuccessful: function (): void {
    this.isSubmittingSuccessful = true;
  },
  disableIsSubmittingSuccessful: function (): void {
    this.isSubmittingSuccessful = false;
  },
  clearErrors: function (): void {
    this.replyContent.setErrors(null);
  },
};
