import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCrudExchangeRateComponent } from './dialog-crud-tipo-cambio.component';

describe('DialogCrudExchangeRateComponent', () => {
  let component: DialogCrudExchangeRateComponent;
  let fixture: ComponentFixture<DialogCrudExchangeRateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogCrudExchangeRateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogCrudExchangeRateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
