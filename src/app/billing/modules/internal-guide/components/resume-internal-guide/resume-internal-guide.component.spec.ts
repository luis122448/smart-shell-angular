import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumeInternalGuideComponent } from './resume-internal-guide.component';

describe('ResumeInternalGuideComponent', () => {
  let component: ResumeInternalGuideComponent;
  let fixture: ComponentFixture<ResumeInternalGuideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResumeInternalGuideComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResumeInternalGuideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
