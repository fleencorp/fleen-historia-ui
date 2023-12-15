import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {AppComponent} from "./app.component";
import {AuthGuard} from "@app/base/guard";
import {FleenComgroupComponent} from "@app/base/component";

const routes: Routes = [
  { path: "", component: AppComponent },
  { path: 'auth', loadChildren: () => import('@app/feature/authentication/authentication.module').then(m => m.AuthenticationModule) },
  { path: 'mfa', loadChildren: () => import('@app/feature/mfa/mfa.module').then(m => m.MfaModule), canActivate: [AuthGuard] },
  { path: "**", component: FleenComgroupComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
