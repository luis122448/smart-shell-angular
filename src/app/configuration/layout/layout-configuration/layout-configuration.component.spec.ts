import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutConfigurationComponent } from './layout-configuration.component';

describe('LayoutConfigurationComponent', () => {
  let component: LayoutConfigurationComponent;
  let fixture: ComponentFixture<LayoutConfigurationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LayoutConfigurationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LayoutConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
