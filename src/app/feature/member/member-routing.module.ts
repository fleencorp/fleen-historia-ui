import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from "@app/base/guard";
import {
  MemberBaseComponent,
  MemberDashboardComponent,
  MemberDetailComponent,
  UpdateDetailComponent,
  UpdateEmailComponent,
  UpdatePasswordComponent,
  UpdatePhoneComponent,
  UpdatePhotoComponent
} from "./component";

const routes: Routes = [
  { path: '',
    canActivate: [AuthGuard],
    component: MemberBaseComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: MemberDashboardComponent, title: 'Member Dashboard' },
      { path: 'detail', component: MemberDetailComponent, title: 'View Detail' },
      { path: 'update-detail', component: UpdateDetailComponent, title: 'Update Detail' },
      { path: 'update-email', component: UpdateEmailComponent, title: 'Update Email' },
      { path: 'update-password', component: UpdatePasswordComponent, title: 'Update Password' },
      { path: 'update-phone', component: UpdatePhoneComponent, title: 'Update Phone' },
      { path: 'update-photo', component: UpdatePhotoComponent, title: 'Update Photo' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MemberRoutingModule { }
