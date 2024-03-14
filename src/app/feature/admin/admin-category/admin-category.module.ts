import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AdminCategoryRoutingModule} from './admin-category-routing.module';
import {CategoryEntriesComponent, CategoryEntryComponent, CategoryUpdateComponent} from './component';
import {SharedComponentModule} from "@app/shared/component/shared-component.module";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    CategoryEntryComponent,
    CategoryUpdateComponent,
    CategoryEntriesComponent,
  ],
  imports: [
    CommonModule,
    AdminCategoryRoutingModule,
    SharedComponentModule,
    ReactiveFormsModule
  ]
})
export class AdminCategoryModule { }
