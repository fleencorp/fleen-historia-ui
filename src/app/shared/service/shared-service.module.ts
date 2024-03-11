import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BaseHttpService, FileUploadDownloadService, HttpClientService, S3Service, SignedUrlService} from "./impl";
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
    SignedUrlService,
    S3Service,
    HttpServiceConfig
  ],
  exports: [
    HttpClientModule
  ]
})
export class SharedServiceModule { }
