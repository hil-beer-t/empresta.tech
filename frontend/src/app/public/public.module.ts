import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { NavComponent } from './components/nav/nav.component';
import { AuthModalComponent } from './components/auth-modal/auth-modal.component';
import { RegisterComponent } from './components/register/register.component';
import { AddressComponent } from './components/address/address.component';

@NgModule({
  declarations: [
    NavComponent,
    AuthModalComponent,
    RegisterComponent,
    LoginComponent,
    AddressComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    FormsModule,
  ],
  exports: [
    NavComponent,
    AuthModalComponent,
  ]
})
export class PublicModule { }
