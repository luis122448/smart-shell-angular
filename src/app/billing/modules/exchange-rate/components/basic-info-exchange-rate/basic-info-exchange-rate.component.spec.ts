import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicInfoExchangeRateComponent } from './basic-info-exchange-rate.component';

describe('BasicInfoExchangeRateComponent', () => {
  let component: BasicInfoExchangeRateComponent;
  let fixture: ComponentFixture<BasicInfoExchangeRateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BasicInfoExchangeRateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BasicInfoExchangeRateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
