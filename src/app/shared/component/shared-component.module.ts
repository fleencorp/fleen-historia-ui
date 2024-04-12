import {NgModule} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {AnyArray} from "@app/model/type";
import {
  ChangePasswordComponent,
  CommentComponent,
  CreateVideoComponent,
  EntriesDeleteAllComponent,
  FormMessageComponent,
  LoadingSpinnerComponent,
  PaginationComponent,
  ReplyComponent,
  RowEntryOptionComponent,
  SearchFormDeleteMenuComponent,
  ShowReviewHistoryComponent,
  ShowVideoDetailComponent,
  SubmitLoadingIconComponent,
  SuccessButtonComponent,
  UpdateVideoInfoComponent,
  UploadFileComponent,
  ValidationErrorComponent,
  VideoDetailOptionComponent
} from "./index";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {BaseModule} from "@app/base/base.module";
import {RouterModule} from "@angular/router";


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
  CommentComponent,
  ReplyComponent,
  UpdateVideoInfoComponent,
  CreateVideoComponent
]

@NgModule({
  declarations: [
    ...components,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    FontAwesomeModule,
    NgOptimizedImage,
    BaseModule,
    FormsModule,
  ],
  exports: [
    ...components,
  ]
})
export class SharedComponentModule { }
