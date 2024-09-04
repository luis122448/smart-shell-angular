import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterInventoryTakingComponent } from './register-inventory-taking.component';

describe('RegisterInventoryTakingComponent', () => {
  let component: RegisterInventoryTakingComponent;
  let fixture: ComponentFixture<RegisterInventoryTakingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterInventoryTakingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterInventoryTakingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
