import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchInternalGuideComponent } from './search-internal-guide.component';

describe('SearchInternalGuideComponent', () => {
  let component: SearchInternalGuideComponent;
  let fixture: ComponentFixture<SearchInternalGuideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchInternalGuideComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchInternalGuideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
