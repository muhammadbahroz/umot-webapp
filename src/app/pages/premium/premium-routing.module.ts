import { PremiumRecommendationPageComponent } from './premium-recommendation-page/premium-recommendation-page.component';
import { PremiumWishListComponent } from './premium-wish-list/premium-wish-list.component';
import { PremiumIdealPlatformComponent } from './premium-ideal-platform/premium-ideal-platform.component';
import { PremiumHistoryComponent } from './premium-history/premium-history.component';
import { PremiumPrivacyPolicyComponent } from './premium-privacy-policy/premium-privacy-policy.component';
import { PremiumFaqComponent } from './premium-faq/premium-faq.component';
import { PremiumMovieComponent } from './premium-movie/premium-movie.component';
import { PremiumMenuSearchComponent } from './premium-menu-search/premium-menu-search.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PremiumPage } from './premium.page';

const routes: Routes = [
  {
    path: '',
    component: PremiumPage
  },
  {
    path: 'premium-menu-search/:id',
    component: PremiumMenuSearchComponent
  },
  {
    path: 'premium-movie/:id',
    component: PremiumMovieComponent
  },
  {
    path: 'premium-faq',
    component: PremiumFaqComponent
  },
  {
    path: 'premium-privacy-policy',
    component: PremiumPrivacyPolicyComponent
  },
  {
    path: 'premium-history',
    component: PremiumHistoryComponent
  },
  {
    path: 'premium-ideal-platform',
    component: PremiumIdealPlatformComponent
  },
  {
    path: 'premium-wish-list',
    component: PremiumWishListComponent
  },
  {
    path: 'premium-recommendation-page/:id',
    component: PremiumRecommendationPageComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PremiumPageRoutingModule {}
