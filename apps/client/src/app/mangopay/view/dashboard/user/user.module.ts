import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UserComponent } from './user.component';

import { UserListModule } from '../../user/list/list.module';

@NgModule({
  declarations: [
    UserComponent
  ],
  imports: [
    CommonModule,
    UserListModule,
    RouterModule.forChild([{ path: '', component: UserComponent }])
  ]
})
export class UserModule { }
