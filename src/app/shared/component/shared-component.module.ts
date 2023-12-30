import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AnyArray} from "@app/model/type";
import {
  ChangePasswordComponent,
  EntriesDeleteAllComponent,
  FormMessageComponent,
  LoadingSpinnerComponent,
  PaginationComponent,
  RowEntryOptionComponent,
  SearchFormDeleteMenuComponent,
  UploadFileComponent,
  ValidationErrorComponent,
} from "./index";
import {ReactiveFormsModule} from "@angular/forms";


const components: AnyArray = [
  ChangePasswordComponent,
  EntriesDeleteAllComponent,
  FormMessageComponent,
  LoadingSpinnerComponent,
  PaginationComponent,
  RowEntryOptionComponent,
  SearchFormDeleteMenuComponent,
  UploadFileComponent,
  ValidationErrorComponent
]

@NgModule({
  declarations: [
    ...components,
    FormMessageComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  exports: [
    ...components
  ]
})
export class SharedComponentModule { }
