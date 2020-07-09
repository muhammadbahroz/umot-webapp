import { MenuSearchComponent } from './menu-search/menu-search.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';
import { MovieComponent } from './movie/movie.component';
import { FaqComponent } from './faq/faq.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';

const routes: Routes = [
  {
    path: '',
    component: HomePage
  },
  {
    path: 'menu-search/:id',
    component: MenuSearchComponent
  },
  {
    path: 'menu-search',
    component: MenuSearchComponent
  },
  {
    path: 'movie/:id',
    component: MovieComponent
  },
  {
    path: 'movie',
    component: MovieComponent
  },
  {
    path: 'faq',
    component: FaqComponent
  },
  {
    path: 'privacy-policy',
    component: PrivacyPolicyComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
