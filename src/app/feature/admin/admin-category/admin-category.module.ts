import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AdminCategoryRoutingModule} from './admin-category-routing.module';
import {
  AddCategoryComponent,
  CategoryBaseComponent,
  CategoryDashboardComponent,
  CategoryEntriesComponent,
  CategoryDetailComponent,
  CategoryUpdateComponent
} from './component';
import {SharedModule} from "@app/shared/shared.module";
import {BaseModule} from "@app/base/base.module";
import {AdminCategoryService} from "@app/feature/admin/admin-category/service";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";


@NgModule({
  declarations: [
    AddCategoryComponent,
    CategoryBaseComponent,
    CategoryDashboardComponent,
    CategoryDetailComponent,
    CategoryUpdateComponent,
    CategoryEntriesComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    BaseModule,
    FontAwesomeModule,
    AdminCategoryRoutingModule
  ],
  providers: [
    AdminCategoryService
  ],
  exports: [
    AddCategoryComponent
  ]
})
export class AdminCategoryModule { }
