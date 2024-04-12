import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MfaRoutingModule} from './mfa-routing.module';
import {MfaBaseComponent, MfaDashboardComponent, MfaSetupComponent, MfaStatusComponent} from './component';
import {MfaService} from "./service/mfa.service";
import {AuthenticationModule} from "@app/feature";
import {SharedModule} from "@app/shared/shared.module";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";


@NgModule({
  declarations: [
    MfaSetupComponent,
    MfaBaseComponent,
    MfaDashboardComponent,
    MfaStatusComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MfaRoutingModule,
    AuthenticationModule,
    FontAwesomeModule,
  ],
  providers: [
    MfaService
  ]
})
export class MfaModule { }
