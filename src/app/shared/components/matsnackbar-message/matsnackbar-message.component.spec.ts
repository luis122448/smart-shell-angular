import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatsnackbarMessageComponent } from './matsnackbar-message.component';

describe('MatsnackbarMessageComponent', () => {
  let component: MatsnackbarMessageComponent;
  let fixture: ComponentFixture<MatsnackbarMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatsnackbarMessageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatsnackbarMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
