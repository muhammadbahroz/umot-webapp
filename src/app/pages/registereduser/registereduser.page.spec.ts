import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RegistereduserPage } from './registereduser.page';

describe('RegistereduserPage', () => {
  let component: RegistereduserPage;
  let fixture: ComponentFixture<RegistereduserPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistereduserPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RegistereduserPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
