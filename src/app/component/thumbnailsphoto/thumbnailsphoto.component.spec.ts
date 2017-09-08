import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThumbnailsphotoComponent } from './thumbnailsphoto.component';

describe('ThumbnailsphotoComponent', () => {
  let component: ThumbnailsphotoComponent;
  let fixture: ComponentFixture<ThumbnailsphotoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThumbnailsphotoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThumbnailsphotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
