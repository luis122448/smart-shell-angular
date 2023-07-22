import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonOperacComponent } from './button-operac.component';

describe('ButtonOperacComponent', () => {
  let component: ButtonOperacComponent;
  let fixture: ComponentFixture<ButtonOperacComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ButtonOperacComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonOperacComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
