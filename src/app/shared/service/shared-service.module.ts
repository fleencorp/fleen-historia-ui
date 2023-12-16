import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BaseHttpService, FileUploadDownloadService, HttpClientService} from "./impl";
import {HttpServiceConfig} from "@app/config";
import {HttpClientModule} from "@angular/common/http";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    BaseHttpService,
    HttpClientService,
    FileUploadDownloadService,
    HttpServiceConfig
  ],
  exports: [
    HttpClientModule
  ]
})
export class SharedServiceModule { }
