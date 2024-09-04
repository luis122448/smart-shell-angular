import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailItemsInventoryTakingComponent } from './detail-items-inventory-taking.component';

describe('DetailItemsInventoryTakingComponent', () => {
  let component: DetailItemsInventoryTakingComponent;
  let fixture: ComponentFixture<DetailItemsInventoryTakingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailItemsInventoryTakingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailItemsInventoryTakingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
