import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  BaseHttpService,
  FileUploadDownloadService,
  HttpClientService,
  ObjectService,
  S3Service,
  SignedUrlService
} from "./impl";
import {HttpServiceConfig} from "@app/config";
import {HttpClientModule} from "@angular/common/http";
import {MiscService} from "@app/shared/service/impl/common";


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
    MiscService,
    ObjectService,
    HttpServiceConfig
  ],
  exports: [
    HttpClientModule
  ]
})
export class SharedServiceModule { }
