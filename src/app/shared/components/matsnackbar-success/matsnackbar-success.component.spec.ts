import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatsnackbarSuccessComponent } from './matsnackbar-success.component';

describe('MatsnackbarSuccessComponent', () => {
  let component: MatsnackbarSuccessComponent;
  let fixture: ComponentFixture<MatsnackbarSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatsnackbarSuccessComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatsnackbarSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
