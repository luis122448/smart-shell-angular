import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertStandardComponent } from './alert-standard.component';

describe('AlertStandardComponent', () => {
  let component: AlertStandardComponent;
  let fixture: ComponentFixture<AlertStandardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlertStandardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlertStandardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
