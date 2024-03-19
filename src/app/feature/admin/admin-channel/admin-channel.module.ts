import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AddChannelComponent} from '@app/feature/admin/admin-channel/component';
import {AdminChannelService} from "@app/feature/admin/admin-channel/service";
import {BaseModule} from "@app/base/base.module";
import {ReactiveFormsModule} from "@angular/forms";
import {SharedComponentModule} from "@app/shared/component/shared-component.module";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";


@NgModule({
  declarations: [
    AddChannelComponent
  ],
  imports: [
    CommonModule,
    BaseModule,
    ReactiveFormsModule,
    SharedComponentModule,
    FontAwesomeModule
  ],
  providers: [
    AdminChannelService
  ],
  exports: [
    AddChannelComponent
  ]
})
export class AdminChannelModule { }
