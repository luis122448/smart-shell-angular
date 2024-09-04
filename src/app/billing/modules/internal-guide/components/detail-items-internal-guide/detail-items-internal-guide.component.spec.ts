import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailItemsInternalGuideComponent } from './detail-items-internal-guide.component';

describe('DetailItemsInternalGuideComponent', () => {
  let component: DetailItemsInternalGuideComponent;
  let fixture: ComponentFixture<DetailItemsInternalGuideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailItemsInternalGuideComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailItemsInternalGuideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
