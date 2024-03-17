import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAllDocumentTransactionComponent } from './dialog-all-document-transaction.component';

describe('DialogAllDocumentTransactionComponent', () => {
  let component: DialogAllDocumentTransactionComponent;
  let fixture: ComponentFixture<DialogAllDocumentTransactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAllDocumentTransactionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogAllDocumentTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
