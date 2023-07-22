import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalCreditsComponent } from './personal-credits.component';

describe('PersonalCreditsComponent', () => {
  let component: PersonalCreditsComponent;
  let fixture: ComponentFixture<PersonalCreditsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonalCreditsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonalCreditsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
