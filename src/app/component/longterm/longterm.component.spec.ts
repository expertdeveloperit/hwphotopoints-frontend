import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LongtermComponent } from './longterm.component';

describe('LongtermComponent', () => {
  let component: LongtermComponent;
  let fixture: ComponentFixture<LongtermComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LongtermComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LongtermComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
