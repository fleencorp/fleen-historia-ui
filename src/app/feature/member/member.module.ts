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
    MemberRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedComponentModule
  ],
  providers: [
    MemberService
  ]
})
export class MemberModule { }
