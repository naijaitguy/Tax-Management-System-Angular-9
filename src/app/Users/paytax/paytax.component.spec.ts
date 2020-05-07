import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaytaxComponent } from './paytax.component';

describe('PaytaxComponent', () => {
  let component: PaytaxComponent;
  let fixture: ComponentFixture<PaytaxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaytaxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaytaxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
