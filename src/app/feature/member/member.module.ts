import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MemberRoutingModule} from './member-routing.module';
import {
  MemberBaseComponent,
  MemberDashboardComponent,
  MemberDetailComponent,
  UpdateDetailComponent,
  UpdateEmailOrPhoneComponent,
  UpdatePasswordComponent,
  UpdatePhotoComponent
} from './component';
import {MemberService} from "./service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SharedComponentModule} from "@app/shared/component/shared-component.module";
import {SharedServiceModule} from "@app/shared/service/shared-service.module";
import {BaseModule} from "@app/base/base.module";


@NgModule({
  declarations: [
    MemberDetailComponent,
    UpdateDetailComponent,
    UpdateEmailOrPhoneComponent,
    UpdatePhotoComponent,
    UpdatePasswordComponent,
    MemberBaseComponent,
    MemberDashboardComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedServiceModule,
    SharedComponentModule,
    MemberRoutingModule,
    BaseModule,
  ],
  providers: [
    MemberService
  ]
})
export class MemberModule { }
