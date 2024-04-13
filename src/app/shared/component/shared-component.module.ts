import {NgModule} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {AnyArray} from "@app/model/type";
import {
  ChangePasswordComponent,
  CommentComponent,
  CreateVideoComponent,
  EntriesDeleteAllComponent,
  FormMessageComponent,
  HomepageVideosComponent,
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
import {RouterModule} from "@angular/router";
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
  CommentComponent,
  ReplyComponent,
  UpdateVideoInfoComponent,
  CreateVideoComponent,
  HomepageVideosComponent
]

@NgModule({
  declarations: [
    ...components,
  ],
  imports: [
    CommonModule,
    BaseModule,
    ReactiveFormsModule,
    RouterModule,
    FontAwesomeModule,
    NgOptimizedImage,
    FormsModule,
  ],
  exports: [
    ...components,
  ]
})
export class SharedComponentModule { }
