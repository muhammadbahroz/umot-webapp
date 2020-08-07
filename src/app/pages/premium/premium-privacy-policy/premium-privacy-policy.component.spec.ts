import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PremiumPrivacyPolicyComponent } from './premium-privacy-policy.component';

describe('PremiumPrivacyPolicyComponent', () => {
  let component: PremiumPrivacyPolicyComponent;
  let fixture: ComponentFixture<PremiumPrivacyPolicyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PremiumPrivacyPolicyComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PremiumPrivacyPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
