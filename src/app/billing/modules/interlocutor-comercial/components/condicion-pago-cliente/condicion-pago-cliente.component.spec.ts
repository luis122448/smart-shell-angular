import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CondicionPagoClienteComponent } from './condicion-pago-cliente.component';

describe('CondicionPagoClienteComponent', () => {
  let component: CondicionPagoClienteComponent;
  let fixture: ComponentFixture<CondicionPagoClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CondicionPagoClienteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CondicionPagoClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
