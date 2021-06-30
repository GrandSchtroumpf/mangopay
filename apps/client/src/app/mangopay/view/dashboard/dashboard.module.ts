import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard.component';

import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [DashboardComponent],
  exports: [DashboardComponent],
  imports: [
    CommonModule,
    MatListModule,
    MatButtonModule,
    RouterModule.forRoot([{
      path: 'users',
      loadChildren: () => import('./user/list/list.module').then(m => m.DashboardUserListModule)
    }, {
      path: 'users/:userId',
      loadChildren: () => import('./user/view/view.module').then(m => m.DashboardUserViewModule)
    }])
  ]
})
export class DashboardModule { }
