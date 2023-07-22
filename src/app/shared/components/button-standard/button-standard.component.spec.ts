import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonStandardComponent } from './button-standard.component';

describe('ButtonStandardComponent', () => {
  let component: ButtonStandardComponent;
  let fixture: ComponentFixture<ButtonStandardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ButtonStandardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonStandardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
