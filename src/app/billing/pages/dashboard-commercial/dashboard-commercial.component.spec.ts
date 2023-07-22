import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardCommercialComponent } from './dashboard-commercial.component';

describe('DashboardCommercialComponent', () => {
  let component: DashboardCommercialComponent;
  let fixture: ComponentFixture<DashboardCommercialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardCommercialComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardCommercialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
