import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MfaBaseComponent, MfaDashboardComponent, MfaSetupComponent, MfaStatusComponent} from "./component";
import {AuthGuard} from "@app/base/guard";

const routes: Routes = [
  { path: '',
    canActivate: [AuthGuard],
    component: MfaBaseComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: MfaDashboardComponent, title: 'Mfa Setup' },
      { path: 'setup-update', component: MfaSetupComponent, title: 'Start and Update Setup' },
      { path: 'check-status', component: MfaStatusComponent, title: 'Check and Update Status' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MfaRoutingModule { }
