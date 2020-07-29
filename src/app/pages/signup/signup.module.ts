import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SignupPageRoutingModule } from './signup-routing.module';

import { SignupPage } from './signup.page';
import { EnterDetailsComponent } from './enter-details/enter-details.component';
import { QuestionPageComponent } from './question-page/question-page.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    SignupPageRoutingModule
  ],
  entryComponents:[EnterDetailsComponent,QuestionPageComponent],
  declarations: [SignupPage,EnterDetailsComponent,QuestionPageComponent],
  providers: [DatePipe]
})
export class SignupPageModule {}
