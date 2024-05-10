import {booleanValid, maxLength, required} from "@app/shared/validator";
import {ChannelState} from "@app/model/type";
import {ChannelView} from "@app/model/view/channel";
import {FormBuilder, FormGroup} from "@angular/forms";
import {ANY_EMPTY} from "@app/constant";

export const defaultChannelState: ChannelState = {
  showForm: false,
  isSubmitting: false,
  isSubmittingSuccessful: false,
  message: '',
  errorMessage: '',
  formBuilder: ANY_EMPTY,
  form: ANY_EMPTY,
  initForm: function initForm(channel: ChannelView, formBuilder: FormBuilder): void {
    console.log('Current details');
    console.log(channel);
    this.form = (<FormBuilder>formBuilder).group({
      description: [channel.description, [maxLength(3000)]],
      isActive: [channel.isActive, [required, booleanValid()]]
    });
  },
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
  clearErrors: function (): void {},
};
