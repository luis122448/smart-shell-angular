import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiderbarRigthComponent } from './siderbar-rigth.component';

describe('SiderbarRigthComponent', () => {
  let component: SiderbarRigthComponent;
  let fixture: ComponentFixture<SiderbarRigthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SiderbarRigthComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SiderbarRigthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
