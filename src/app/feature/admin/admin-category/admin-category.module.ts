import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AdminCategoryRoutingModule} from './admin-category-routing.module';
import {CategoryEntriesComponent, CategoryEntryComponent, CategoryUpdateComponent} from './component';
import {SharedModule} from "@app/shared/shared.module";


@NgModule({
  declarations: [
    CategoryEntryComponent,
    CategoryUpdateComponent,
    CategoryEntriesComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    AdminCategoryRoutingModule
  ]
})
export class AdminCategoryModule { }
