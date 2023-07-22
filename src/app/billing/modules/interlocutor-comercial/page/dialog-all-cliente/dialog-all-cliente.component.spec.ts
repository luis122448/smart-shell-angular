import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAllClienteComponent } from './dialog-all-cliente.component';

describe('DialogAllClienteComponent', () => {
  let component: DialogAllClienteComponent;
  let fixture: ComponentFixture<DialogAllClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAllClienteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogAllClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
