import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicInfoClienteComponent } from './basic-info-cliente.component';

describe('BasicInfoClienteComponent', () => {
  let component: BasicInfoClienteComponent;
  let fixture: ComponentFixture<BasicInfoClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BasicInfoClienteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BasicInfoClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
