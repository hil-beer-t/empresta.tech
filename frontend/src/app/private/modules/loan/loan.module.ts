import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoanRoutingModule } from './loan-routing.module';
import { ManageComponent } from './manage/manage.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [


    ManageComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    LoanRoutingModule
  ]
})
export class LoanModule { }
