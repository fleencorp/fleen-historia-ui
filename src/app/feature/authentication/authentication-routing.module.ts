import {NgModule} from '@angular/core';
import {ResolveFn, RouterModule, Routes} from '@angular/router';
import {ForgotPasswordComponent, SignInComponent, SignUpComponent} from "./component";

const resolveSignUpTitle: ResolveFn<string> = () => Promise.resolve('Sign Up');
const resolveSignInTitle: ResolveFn<string> = () => Promise.resolve('Sign In');
const resolveForgotPasswordTitle: ResolveFn<string> = () => Promise.resolve('Forgot Password');

const routes: Routes = [
  { path: 'sign-up', component: SignUpComponent, title: resolveSignUpTitle },
  { path: 'sign-in', component: SignInComponent, title: resolveSignInTitle },
  { path: 'forgot-password', component: ForgotPasswordComponent, title: resolveForgotPasswordTitle },
  { path: '', redirectTo: 'sign-in', pathMatch: 'full' }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
