import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list.component';

import { MangoTableModule } from '../../utils/table/table.module';

@NgModule({
  declarations: [ListComponent],
  exports: [ListComponent],
  imports: [
    CommonModule,
    MangoTableModule
  ]
})
export class UserListModule { }
