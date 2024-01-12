import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicAllExchangeRateComponent } from './basic-all-exchange-rate.component';

describe('BasicAllExchangeRateComponent', () => {
  let component: BasicAllExchangeRateComponent;
  let fixture: ComponentFixture<BasicAllExchangeRateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BasicAllExchangeRateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BasicAllExchangeRateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
