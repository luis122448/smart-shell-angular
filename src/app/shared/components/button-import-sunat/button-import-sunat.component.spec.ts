import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonImportSunatComponent } from './button-import-sunat.component';

describe('ButtonImportSunatComponent', () => {
  let component: ButtonImportSunatComponent;
  let fixture: ComponentFixture<ButtonImportSunatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ButtonImportSunatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonImportSunatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
