import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutInternalGuideComponent } from './layout-internal-guide.component';

describe('LayoutInternalGuideComponent', () => {
  let component: LayoutInternalGuideComponent;
  let fixture: ComponentFixture<LayoutInternalGuideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LayoutInternalGuideComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LayoutInternalGuideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
