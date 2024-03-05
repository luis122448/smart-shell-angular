import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StackTechComponent } from './stack-tech.component';

describe('StackTechComponent', () => {
  let component: StackTechComponent;
  let fixture: ComponentFixture<StackTechComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StackTechComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StackTechComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
