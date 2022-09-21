import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoanRoutingModule } from './loan-routing.module';
import { ManageComponent } from './manage/manage.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { LoanDetailComponent } from './loan-detail/loan-detail.component';
import { LoanCreateComponent } from './loan-create/loan-create.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ManageAccountComponent } from './manage-account/manage-account.component';


@NgModule({
  declarations: [
    ManageComponent,
    LoanDetailComponent,
    LoanCreateComponent,
    ManageAccountComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    LoanRoutingModule,
    TranslateModule
  ]
})
export class LoanModule { }
