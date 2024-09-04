import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiderbarRightComponent } from './siderbar-right.component';

describe('SiderbarRightComponent', () => {
  let component: SiderbarRightComponent;
  let fixture: ComponentFixture<SiderbarRightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SiderbarRightComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SiderbarRightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
