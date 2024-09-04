import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailSearchInventoryTakingComponent } from './detail-search-inventory-taking.component';

describe('DetailSearchInventoryTakingComponent', () => {
  let component: DetailSearchInventoryTakingComponent;
  let fixture: ComponentFixture<DetailSearchInventoryTakingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailSearchInventoryTakingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailSearchInventoryTakingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
