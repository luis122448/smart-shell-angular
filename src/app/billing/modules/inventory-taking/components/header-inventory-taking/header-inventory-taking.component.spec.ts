import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderInventoryTakingComponent } from './header-inventory-taking.component';

describe('HeaderInventoryTakingComponent', () => {
  let component: HeaderInventoryTakingComponent;
  let fixture: ComponentFixture<HeaderInventoryTakingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderInventoryTakingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderInventoryTakingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
