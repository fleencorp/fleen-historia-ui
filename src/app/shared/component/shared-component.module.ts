import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AnyArray} from "@app/model/type";
import {ChangePasswordComponent} from "./change-password/change-password.component";
import {EntriesDeleteAllComponent} from "./entries-delete-all/entries-delete-all.component";
import {LoadingSpinnerComponent} from "./loading-spinner/loading-spinner.component";
import {PaginationComponent} from "./pagination/pagination.component";
import {RowEntryOptionComponent} from "./row-entry-option/row-entry-option.component";
import {SearchFormDeleteMenuComponent} from "./search-form-delete-menu/search-form-delete-menu.component";
import {UploadFileComponent} from "./upload-file/upload-file.component";
import {ValidationErrorComponent} from "./validation-error/validation-error.component";


const components: AnyArray = [
  ChangePasswordComponent,
  EntriesDeleteAllComponent,
  LoadingSpinnerComponent,
  PaginationComponent,
  RowEntryOptionComponent,
  SearchFormDeleteMenuComponent,
  UploadFileComponent,
  ValidationErrorComponent
]

@NgModule({
  declarations: [
    ...components
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ...components
  ]
})
export class SharedComponentModule { }
