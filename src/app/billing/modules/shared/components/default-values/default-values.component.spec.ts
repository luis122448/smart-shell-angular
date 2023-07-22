import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultValuesComponent } from './default-values.component';

describe('DefaultValuesComponent', () => {
  let component: DefaultValuesComponent;
  let fixture: ComponentFixture<DefaultValuesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DefaultValuesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DefaultValuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
