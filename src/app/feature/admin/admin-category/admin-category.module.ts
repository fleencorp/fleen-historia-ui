import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminCategoryRoutingModule } from './admin-category-routing.module';
import { CategoryEntryComponent } from './component/category-entry/category-entry.component';
import { CategoryUpdateComponent } from './component/category-update/category-update.component';
import { CategoryEntriesComponent } from './component/category-entries/category-entries.component';
import { CategoryAddComponent } from './component/category-add/category-add.component';
import {SharedComponentModule} from "@app/shared/component/shared-component.module";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    CategoryEntryComponent,
    CategoryUpdateComponent,
    CategoryEntriesComponent,
    CategoryAddComponent
  ],
  imports: [
    CommonModule,
    AdminCategoryRoutingModule,
    SharedComponentModule,
    ReactiveFormsModule
  ]
})
export class AdminCategoryModule { }
