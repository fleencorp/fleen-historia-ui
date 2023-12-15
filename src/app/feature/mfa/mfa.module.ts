import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MfaRoutingModule} from './mfa-routing.module';
import {MfaBaseComponent, MfaDashboardComponent, MfaSetupComponent, MfaStatusComponent} from './component';
import {MfaService} from "./service/mfa.service";
import {AuthenticationModule} from "../authentication/authentication.module";
import {SharedModule} from "@app/shared/shared.module";


@NgModule({
  declarations: [
    MfaSetupComponent,
    MfaBaseComponent,
    MfaDashboardComponent,
    MfaStatusComponent
  ],
  imports: [
    CommonModule,
    MfaRoutingModule,
    SharedModule,
    AuthenticationModule
  ],
  providers: [
    MfaService
  ]
})
export class MfaModule { }
