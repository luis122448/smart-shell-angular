import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailSearchInternalGuideComponent } from './detail-search-internal-guide.component';

describe('DetailSearchInternalGuideComponent', () => {
  let component: DetailSearchInternalGuideComponent;
  let fixture: ComponentFixture<DetailSearchInternalGuideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailSearchInternalGuideComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailSearchInternalGuideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
