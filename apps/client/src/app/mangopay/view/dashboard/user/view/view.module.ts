import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserViewComponent } from './view.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    UserViewComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{
      path: '',
      component: UserViewComponent
    }])
  ]
})
export class DashboardUserViewModule { }
