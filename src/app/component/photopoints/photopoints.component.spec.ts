import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotopointsComponent } from './photopoints.component';

describe('PhotopointsComponent', () => {
  let component: PhotopointsComponent;
  let fixture: ComponentFixture<PhotopointsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhotopointsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotopointsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
