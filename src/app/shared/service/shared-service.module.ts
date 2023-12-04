import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientService} from "./impl";
import {HttpServiceConfig} from "../../config";


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    HttpClientService,
    HttpServiceConfig
  ]
})
export class SharedServiceModule { }
