import { FaqComponent } from './faq/faq.component';
import { MenuSearchComponent } from './menu-search/menu-search.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { MovieComponent } from './movie/movie.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule
  ],
  entryComponents: [
    HomePage,
    MenuSearchComponent,
    MovieComponent,
    FaqComponent,
    PrivacyPolicyComponent
  ],
  declarations: [
    HomePage,
    MenuSearchComponent,
    MovieComponent,
    FaqComponent,
    PrivacyPolicyComponent
  ]
})
export class HomePageModule {}
