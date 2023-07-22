import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailItemsFacbolComponent } from './detail-items-facbol.component';

describe('DetailItemsFacbolComponent', () => {
  let component: DetailItemsFacbolComponent;
  let fixture: ComponentFixture<DetailItemsFacbolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailItemsFacbolComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailItemsFacbolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
