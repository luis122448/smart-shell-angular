import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCrudClienteComponent } from './dialog-crud-cliente.component';

describe('DialogCrudClienteComponent', () => {
  let component: DialogCrudClienteComponent;
  let fixture: ComponentFixture<DialogCrudClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogCrudClienteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogCrudClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
