import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AdminMemberRoutingModule} from './admin-member-routing.module';
import {
  AdminMemberBaseComponent,
  AdminMemberDashboardComponent,
  AdminMemberDetailComponent,
  AdminMemberEntriesComponent,
  AdminMemberUpdateComponent,
  MemberRoleUpdateComponent
} from '@app/feature/admin/admin-member/component';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {BaseModule} from "@app/base/base.module";
import {ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "@app/shared/shared.module";
import {AdminMemberService} from "@app/feature/admin/admin-member/service";


@NgModule({
  declarations: [
    AdminMemberBaseComponent,
    AdminMemberDashboardComponent,
    AdminMemberEntriesComponent,
    AdminMemberDetailComponent,
    AdminMemberUpdateComponent,
    MemberRoleUpdateComponent
  ],
  imports: [
    CommonModule,
    BaseModule,
    SharedModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    AdminMemberRoutingModule
  ],
  providers: [
    AdminMemberService
  ]
})
export class AdminMemberModule { }
