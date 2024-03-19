import {NgModule} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {AnyArray} from "@app/model/type";
import {
  ChangePasswordComponent,
  EntriesDeleteAllComponent,
  FormMessageComponent,
  LoadingCameraComponent,
  LoadingSpinnerComponent,
  PaginationComponent,
  RowEntryOptionComponent,
  SearchFormDeleteMenuComponent,
  SubmitLoadingIconComponent,
  SuccessButtonComponent,
  UploadFileComponent,
  ValidationErrorComponent,
} from "./index";
import {ReactiveFormsModule} from "@angular/forms";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";


const components: AnyArray = [
  ChangePasswordComponent,
  EntriesDeleteAllComponent,
  FormMessageComponent,
  LoadingSpinnerComponent,
  PaginationComponent,
  RowEntryOptionComponent,
  SearchFormDeleteMenuComponent,
  UploadFileComponent,
  ValidationErrorComponent,
  SubmitLoadingIconComponent,
  SuccessButtonComponent,
  LoadingCameraComponent,
]

@NgModule({
  declarations: [
    ...components,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    NgOptimizedImage,
  ],
  exports: [
    ...components
  ]
})
export class SharedComponentModule { }
