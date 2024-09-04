import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumeInventoryTakingComponent } from './resume-inventory-taking.component';

describe('ResumeInventoryTakingComponent', () => {
  let component: ResumeInventoryTakingComponent;
  let fixture: ComponentFixture<ResumeInventoryTakingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResumeInventoryTakingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResumeInventoryTakingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
