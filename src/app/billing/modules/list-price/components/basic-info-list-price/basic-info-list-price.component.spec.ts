import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicInfoListPriceComponent } from './basic-info-list-price.component';

describe('BasicInfoListPriceComponent', () => {
  let component: BasicInfoListPriceComponent;
  let fixture: ComponentFixture<BasicInfoListPriceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BasicInfoListPriceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BasicInfoListPriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
