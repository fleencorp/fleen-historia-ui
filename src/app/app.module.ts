import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BaseModule} from "@app/base/base.module";
import {AuthorizationInterceptor, ContentTypeInterceptor} from "@app/base/interceptor";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {AuthenticationService} from "@app/feature/authentication/service";
import {SharedServiceModule} from "@app/shared/service/shared-service.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    BaseModule,
    SharedServiceModule,
    AppRoutingModule
  ],
  providers: [
    AuthenticationService,
    { provide: HTTP_INTERCEPTORS, useClass: ContentTypeInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthorizationInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
