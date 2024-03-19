import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AddCategoryComponent} from "@app/feature/category/component";


const components: any[] = [
  AddCategoryComponent
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
export class CategoryModule { }
