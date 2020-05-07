import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HearderComponent } from './hearder.component';

describe('HearderComponent', () => {
  let component: HearderComponent;
  let fixture: ComponentFixture<HearderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HearderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HearderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
