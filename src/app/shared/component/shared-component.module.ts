import {NgModule} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {AnyArray} from "@app/model/type";
import {
  ChangePasswordComponent,
  EntriesDeleteAllComponent,
  FormMessageComponent,
  LoadingSpinnerComponent,
  PaginationComponent,
  RowEntryOptionComponent,
  SearchFormDeleteMenuComponent,
  ShowReviewHistoryComponent,
  ShowVideoDetailComponent,
  SubmitLoadingIconComponent,
  SuccessButtonComponent,
  UploadFileComponent,
  ValidationErrorComponent,
  VideoDetailOptionComponent,
} from "./index";
import {ReactiveFormsModule} from "@angular/forms";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {BaseModule} from "@app/base/base.module";


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
  ShowReviewHistoryComponent,
  ShowVideoDetailComponent,
  VideoDetailOptionComponent,
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
    BaseModule,
  ],
  exports: [
    ...components,
  ]
})
export class SharedComponentModule { }
