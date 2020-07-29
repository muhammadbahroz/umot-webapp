import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignupPage } from './signup.page';
import { EnterDetailsComponent } from './enter-details/enter-details.component';
import { QuestionPageComponent } from './question-page/question-page.component';

const routes: Routes = [
  {
    path: '',
    component: SignupPage
  },
  {
    path: 'enter-details/:id',
    component: EnterDetailsComponent
  }
  ,
  {
    path: 'enter-details',
    component: EnterDetailsComponent
  },
  {
    path: 'question-page',
    component: QuestionPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SignupPageRoutingModule {}
