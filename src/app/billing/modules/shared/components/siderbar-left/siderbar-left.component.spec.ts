import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiderbarLeftComponent } from './siderbar-left.component';

describe('SiderbarLeftComponent', () => {
  let component: SiderbarLeftComponent;
  let fixture: ComponentFixture<SiderbarLeftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SiderbarLeftComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SiderbarLeftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
