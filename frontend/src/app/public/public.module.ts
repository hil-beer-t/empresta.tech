import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { NavComponent } from './components/nav/nav.component';
import { AuthModalComponent } from './components/auth-modal/auth-modal.component';
import { RegisterComponent } from './components/register/register.component';
import { AddressComponent } from './components/address/address.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { HomeComponent } from './components/home/home.component';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './components/footer/footer.component';
import { AboutComponent } from './components/about/about.component';

@NgModule({
  declarations: [
    NavComponent,
    AuthModalComponent,
    RegisterComponent,
    LoginComponent,
    AddressComponent,
    NotFoundComponent,
    HomeComponent,
    FooterComponent,
    AboutComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    FormsModule,
    RouterModule
  ],
  exports: [
    NavComponent,
    FooterComponent,
    AuthModalComponent,
    NotFoundComponent,
    HomeComponent,
  ]
})
export class PublicModule { }
