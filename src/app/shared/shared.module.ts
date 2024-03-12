import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedServiceModule} from "./service/shared-service.module";
import {SharedComponentModule} from "./component/shared-component.module";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedServiceModule,
    SharedComponentModule
  ],
  exports: [
    ReactiveFormsModule
    SharedServiceModule,
    SharedComponentModule,
  ]
})
export class SharedModule { }
