import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumeFacbolComponent } from './resume-facbol.component';

describe('ResumeFacbolComponent', () => {
  let component: ResumeFacbolComponent;
  let fixture: ComponentFixture<ResumeFacbolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResumeFacbolComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResumeFacbolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
