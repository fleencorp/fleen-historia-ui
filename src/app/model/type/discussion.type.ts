import {FormControl} from "@angular/forms";

export interface ReplyState {
  showForm: boolean;
  isSubmitting: boolean;
  isSubmittingSuccessful: boolean;
  replyContent: FormControl;
  message: string;
  clearMessage: () => void;
  hideForm: () => void;
  enableSubmitting: () => void;
  disableSubmitting: () => void;
  enableIsSubmittingSuccessful: () => void;
  disableIsSubmittingSuccessful: () => void;
  clearErrors: () => void;
}

export interface ReplyStateMap {
  [commentId: string]: ReplyState;
}
