import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterFacbolComponent } from './register-facbol.component';

describe('RegisterFacbolComponent', () => {
  let component: RegisterFacbolComponent;
  let fixture: ComponentFixture<RegisterFacbolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterFacbolComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterFacbolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
