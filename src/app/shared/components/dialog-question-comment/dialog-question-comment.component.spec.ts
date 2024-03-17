import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogQuestionCommentComponent } from './dialog-question-comment.component';

describe('DialogQuestionCommentComponent', () => {
  let component: DialogQuestionCommentComponent;
  let fixture: ComponentFixture<DialogQuestionCommentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogQuestionCommentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogQuestionCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
