import { AboutComponent } from './public/components/about/about.component';
import { AuthGuard } from './core/guards/auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './public/components/home/home.component';
import { NotFoundComponent } from './public/components/not-found/not-found.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  {
    path: '',
    loadChildren: async () => (await import('./private/modules/loan/loan.module')).LoanModule,
    canActivate: [AuthGuard],
  },
  {
    // wildcard routes
    path: '**', component: NotFoundComponent
    // keep it down here
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
