import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchFacbolComponent } from './search-facbol.component';

describe('SearchFacbolComponent', () => {
  let component: SearchFacbolComponent;
  let fixture: ComponentFixture<SearchFacbolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchFacbolComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchFacbolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
