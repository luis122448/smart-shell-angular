import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicImportListPriceComponent } from './basic-import-list-price.component';

describe('BasicImportListPriceComponent', () => {
  let component: BasicImportListPriceComponent;
  let fixture: ComponentFixture<BasicImportListPriceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BasicImportListPriceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BasicImportListPriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
