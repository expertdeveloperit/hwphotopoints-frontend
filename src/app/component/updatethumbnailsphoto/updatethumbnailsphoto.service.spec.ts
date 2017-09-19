import { TestBed, inject } from '@angular/core/testing';

import { UpdatethumbnailsphotoService } from './updatethumbnailsphoto.service';

describe('UpdatethumbnailsphotoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UpdatethumbnailsphotoService]
    });
  });

  it('should be created', inject([UpdatethumbnailsphotoService], (service: UpdatethumbnailsphotoService) => {
    expect(service).toBeTruthy();
  }));
});
