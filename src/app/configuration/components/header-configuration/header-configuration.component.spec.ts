import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderConfigurationComponent } from './header-configuration.component';

describe('HeaderConfigurationComponent', () => {
  let component: HeaderConfigurationComponent;
  let fixture: ComponentFixture<HeaderConfigurationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderConfigurationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
