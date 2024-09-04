import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutInventoryTakingComponent } from './layout-inventory-taking.component';

describe('LayoutInventoryTakingComponent', () => {
  let component: LayoutInventoryTakingComponent;
  let fixture: ComponentFixture<LayoutInventoryTakingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LayoutInventoryTakingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LayoutInventoryTakingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
