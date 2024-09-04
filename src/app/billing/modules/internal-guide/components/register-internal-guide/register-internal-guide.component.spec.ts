import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterInternalGuideComponent } from './register-internal-guide.component';

describe('RegisterInternalGuideComponent', () => {
  let component: RegisterInternalGuideComponent;
  let fixture: ComponentFixture<RegisterInternalGuideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterInternalGuideComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterInternalGuideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
