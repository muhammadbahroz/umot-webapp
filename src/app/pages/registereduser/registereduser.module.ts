import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistereduserPageRoutingModule } from './registereduser-routing.module';

import { RegistereduserPage } from './registereduser.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistereduserPageRoutingModule
  ],
  declarations: [RegistereduserPage]
})
export class RegistereduserPageModule {}
