import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PremiumIdealPlatformComponent } from './premium-ideal-platform.component';

describe('PremiumIdealPlatformComponent', () => {
  let component: PremiumIdealPlatformComponent;
  let fixture: ComponentFixture<PremiumIdealPlatformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PremiumIdealPlatformComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PremiumIdealPlatformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
