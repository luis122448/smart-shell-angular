import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogQuestionComponent } from './dialog-question.component';

describe('DialogQuestionComponent', () => {
  let component: DialogQuestionComponent;
  let fixture: ComponentFixture<DialogQuestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogQuestionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
