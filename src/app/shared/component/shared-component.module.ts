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
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {BaseModule} from "@app/base/base.module";
import { CommentComponent } from './discussion/comment/comment.component';
import { ReplyComponent } from './discussion/reply/reply.component';


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
    CommentComponent,
    ReplyComponent,

  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    NgOptimizedImage,
    BaseModule,
    FormsModule,
  ],
  exports: [
    ...components,
    CommentComponent,
  ]
})
export class SharedComponentModule { }
