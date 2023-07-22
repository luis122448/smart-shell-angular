import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogErrorAlertComponent } from './dialog-error-alert.component';

describe('DialogErrorAlertComponent', () => {
  let component: DialogErrorAlertComponent;
  let fixture: ComponentFixture<DialogErrorAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogErrorAlertComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogErrorAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
