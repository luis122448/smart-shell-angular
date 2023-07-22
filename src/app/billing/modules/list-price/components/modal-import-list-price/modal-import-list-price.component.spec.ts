import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalImportListPriceComponent } from './modal-import-list-price.component';

describe('ModalImportListPriceComponent', () => {
  let component: ModalImportListPriceComponent;
  let fixture: ComponentFixture<ModalImportListPriceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalImportListPriceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalImportListPriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
