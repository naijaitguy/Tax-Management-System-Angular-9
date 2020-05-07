import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxApplicationComponent } from './tax-application.component';

describe('TaxApplicationComponent', () => {
  let component: TaxApplicationComponent;
  let fixture: ComponentFixture<TaxApplicationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaxApplicationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
