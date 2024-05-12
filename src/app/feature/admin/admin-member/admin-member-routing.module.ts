import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from "@app/base/guard";
import {
  AdminMemberBaseComponent,
  AdminMemberDashboardComponent,
  AdminMemberDetailComponent,
  AdminMemberEntriesComponent,
  AdminMemberUpdateComponent
} from "@app/feature/admin/admin-member/component";

const routes: Routes = [
  { path: '',
    canActivate: [AuthGuard],
    component: AdminMemberBaseComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: AdminMemberDashboardComponent, title: 'Admin Member Dashboard' },
      { path: 'entries', component: AdminMemberEntriesComponent, title: 'Member Entries' },
      { path: 'detail/:id', component: AdminMemberDetailComponent, title: 'Member Detail' },
      { path: 'update/:id', component: AdminMemberUpdateComponent, title: 'Member Update' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminMemberRoutingModule { }
