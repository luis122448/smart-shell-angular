import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutCreditsComponent } from './layout-credits.component';

describe('LayoutCreditsComponent', () => {
  let component: LayoutCreditsComponent;
  let fixture: ComponentFixture<LayoutCreditsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LayoutCreditsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LayoutCreditsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
