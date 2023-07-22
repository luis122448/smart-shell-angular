import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonImportSbsComponent } from './button-import-sbs.component';

describe('ButtonImportSbsComponent', () => {
  let component: ButtonImportSbsComponent;
  let fixture: ComponentFixture<ButtonImportSbsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ButtonImportSbsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonImportSbsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
