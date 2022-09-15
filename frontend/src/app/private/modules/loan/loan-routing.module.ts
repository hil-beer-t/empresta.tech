import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoanDetailComponent } from './loan-detail/loan-detail.component';
import { ManageComponent } from './manage/manage.component';

const routes: Routes = [
  {
    path: 'manage',
    component: ManageComponent
  },
  {
    path: 'loan-detail/:cod',
    pathMatch: 'full',
    component: LoanDetailComponent
    // resolve: {
    //   loan: LoanService
    // }
  },
  {
    path: 'manage-loans',
    redirectTo: 'manage'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoanRoutingModule { }
