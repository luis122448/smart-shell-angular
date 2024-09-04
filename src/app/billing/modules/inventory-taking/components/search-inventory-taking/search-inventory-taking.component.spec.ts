import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchInventoryTakingComponent } from './search-inventory-taking.component';

describe('SearchInventoryTakingComponent', () => {
  let component: SearchInventoryTakingComponent;
  let fixture: ComponentFixture<SearchInventoryTakingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchInventoryTakingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchInventoryTakingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
