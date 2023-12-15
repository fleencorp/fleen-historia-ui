import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedServiceModule} from "./service/shared-service.module";
import {SharedComponentModule} from "./component/shared-component.module";


@NgModule({
  imports: [
    CommonModule,
    SharedServiceModule,
    SharedComponentModule
  ],
  exports: [
    SharedServiceModule,
    SharedComponentModule
  ]
})
export class SharedModule { }
