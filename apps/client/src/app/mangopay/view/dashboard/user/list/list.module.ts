import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UserListComponent } from './list.component';

import { UserListModule } from '../../../user/list/list.module';

@NgModule({
  declarations: [UserListComponent],
  imports: [
    CommonModule,
    UserListModule,
    RouterModule.forChild([{ path: '', component: UserListComponent }])
  ]
})
export class DashboardUserListModule { }
