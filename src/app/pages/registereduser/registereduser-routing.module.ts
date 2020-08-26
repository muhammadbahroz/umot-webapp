import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistereduserPage } from './registereduser.page';

const routes: Routes = [
  {
    path: '',
    component: RegistereduserPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistereduserPageRoutingModule {}
