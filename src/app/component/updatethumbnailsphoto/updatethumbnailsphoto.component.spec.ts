import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatethumbnailsphotoComponent } from './updatethumbnailsphoto.component';

describe('UpdatethumbnailsphotoComponent', () => {
  let component: UpdatethumbnailsphotoComponent;
  let fixture: ComponentFixture<UpdatethumbnailsphotoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdatethumbnailsphotoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatethumbnailsphotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
