import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCrudListPriceComponent } from './dialog-crud-list-price.component';

describe('DialogCrudListPriceComponent', () => {
  let component: DialogCrudListPriceComponent;
  let fixture: ComponentFixture<DialogCrudListPriceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogCrudListPriceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogCrudListPriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
