import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputSearchStandardComponent } from './input-search-standard.component';

describe('InputSearchStandardComponent', () => {
  let component: InputSearchStandardComponent;
  let fixture: ComponentFixture<InputSearchStandardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputSearchStandardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputSearchStandardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
