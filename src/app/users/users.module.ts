import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersRoutingModule } from './users-routing.module';
import { AgGridModule } from 'ag-grid-angular';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { UsersComponent } from './components/users/users.component';
import { AgGridCellRendererComponent } from './components/ag-grid-cell-renderer/ag-grid-cell-renderer.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { LoginComponent } from './components/login/login.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ProfileComponent } from './components/profile/profile.component';
import { UpdatePasswordComponent } from './components/update-password/update-password.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';

@NgModule({
  declarations: [
    UsersComponent,
    AgGridCellRendererComponent,
    RegistrationComponent,
    LoginComponent,
    ForgotPasswordComponent,
    ProfileComponent,
    UpdatePasswordComponent,
    ChangePasswordComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    AgGridModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class UsersModule { }
