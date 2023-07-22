import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrincipalConfigurationComponent } from './principal-configuration.component';

describe('PrincipalConfigurationComponent', () => {
  let component: PrincipalConfigurationComponent;
  let fixture: ComponentFixture<PrincipalConfigurationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrincipalConfigurationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrincipalConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
