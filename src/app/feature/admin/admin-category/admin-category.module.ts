import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AdminCategoryRoutingModule} from './admin-category-routing.module';
import {
  AddCategoryComponent,
  CategoryEntriesComponent,
  CategoryEntryComponent,
  CategoryUpdateComponent
} from './component';
import {SharedModule} from "@app/shared/shared.module";
import {BaseModule} from "@app/base/base.module";


@NgModule({
  declarations: [
    AddCategoryComponent,
    CategoryEntryComponent,
    CategoryUpdateComponent,
    CategoryEntriesComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    AdminCategoryRoutingModule,
    BaseModule
  ],
  exports: [
    AddCategoryComponent
  ]
})
export class AdminCategoryModule { }
