import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard.component';



@NgModule({
  declarations: [DashboardComponent],
  exports: [DashboardComponent],
  imports: [
    CommonModule,
    RouterModule.forRoot([{
      path: 'users',
      loadChildren: () => import('./user/user.module').then(m => m.UserModule)
    }])
  ]
})
export class DashboardModule { }
