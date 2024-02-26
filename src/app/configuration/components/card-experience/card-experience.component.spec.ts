import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardExperienceComponent } from './card-experience.component';

describe('CardExperienceComponent', () => {
  let component: CardExperienceComponent;
  let fixture: ComponentFixture<CardExperienceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardExperienceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardExperienceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
