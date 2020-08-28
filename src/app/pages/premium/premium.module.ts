import { PremiumRecommendationPageComponent } from './premium-recommendation-page/premium-recommendation-page.component';
import { PremiumWishListComponent } from './premium-wish-list/premium-wish-list.component';
import { PremiumPrivacyPolicyComponent } from './premium-privacy-policy/premium-privacy-policy.component';
import { PremiumMovieComponent } from './premium-movie/premium-movie.component';
import { PremiumMenuSearchComponent } from './premium-menu-search/premium-menu-search.component';
import { PremiumIdealPlatformComponent } from './premium-ideal-platform/premium-ideal-platform.component';
import { PremiumHistoryComponent } from './premium-history/premium-history.component';
import { PremiumFaqComponent } from './premium-faq/premium-faq.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PremiumPageRoutingModule } from './premium-routing.module';

import { PremiumPage } from './premium.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PremiumPageRoutingModule
  ],
  entryComponents: [
    PremiumPage,
    PremiumFaqComponent,
    PremiumHistoryComponent,
    PremiumIdealPlatformComponent,
    PremiumMenuSearchComponent,
    PremiumMovieComponent,
    PremiumPrivacyPolicyComponent,
    PremiumWishListComponent,
    PremiumRecommendationPageComponent
  ],
  declarations: [
    PremiumPage,
    PremiumFaqComponent,
    PremiumHistoryComponent,
    PremiumIdealPlatformComponent,
    PremiumMenuSearchComponent,
    PremiumMovieComponent,
    PremiumPrivacyPolicyComponent,
    PremiumWishListComponent,
    PremiumRecommendationPageComponent
  ]
})
export class PremiumPageModule {}
