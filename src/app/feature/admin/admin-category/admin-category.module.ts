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
import {AdminCategoryService} from "@app/feature/admin/admin-category/service";


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
  providers: [
    AdminCategoryService
  ],
  exports: [
    AddCategoryComponent
  ]
})
export class AdminCategoryModule { }
