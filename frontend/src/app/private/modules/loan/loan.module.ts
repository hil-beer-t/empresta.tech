import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoanRoutingModule } from './loan-routing.module';
import { ManageComponent } from './manage/manage.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { LoanDetailComponent } from './loan-detail/loan-detail.component';
import { LoanCreateComponent } from './loan-create/loan-create.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ManageComponent,
    LoanDetailComponent,
    LoanCreateComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    LoanRoutingModule
  ]
})
export class LoanModule { }
