import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAllListPriceComponent } from './dialog-all-list-price.component';

describe('DialogAllListPriceComponent', () => {
  let component: DialogAllListPriceComponent;
  let fixture: ComponentFixture<DialogAllListPriceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAllListPriceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogAllListPriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
