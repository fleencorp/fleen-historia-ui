import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FileUploadDownloadService, HttpClientService} from "./impl";
import {HttpServiceConfig} from "@app/config";


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    HttpClientService,
    FileUploadDownloadService,
    HttpServiceConfig
  ]
})
export class SharedServiceModule { }
