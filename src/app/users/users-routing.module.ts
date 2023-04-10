import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './components/users/users.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { LoginComponent } from './components/login/login.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { UpdatePasswordComponent } from './components/update-password/update-password.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';

const routes: Routes = [
  {path: '/', component: UsersComponent},
  {path: '/registration', component: RegistrationComponent},
  {path: '/login', component: LoginComponent},
  {path: '/forgotpassword', component: ForgotPasswordComponent},
  {path: '/updatepassword', component: UpdatePasswordComponent},
  {path: '/changepassword/:token', component: ChangePasswordComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
