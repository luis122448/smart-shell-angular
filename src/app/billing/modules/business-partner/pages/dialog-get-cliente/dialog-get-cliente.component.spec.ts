import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogGetClienteComponent } from './dialog-get-cliente.component';

describe('DialogGetClienteComponent', () => {
  let component: DialogGetClienteComponent;
  let fixture: ComponentFixture<DialogGetClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogGetClienteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogGetClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
