import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDeleteQuestionComponent } from './dialog-delete-question.component';

describe('DialogDeleteQuestionComponent', () => {
  let component: DialogDeleteQuestionComponent;
  let fixture: ComponentFixture<DialogDeleteQuestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogDeleteQuestionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogDeleteQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
