import { TestBed, inject } from '@angular/core/testing';

import { ThumbnailsphotoService } from './thumbnailsphoto.service';

describe('ThumbnailsphotoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ThumbnailsphotoService]
    });
  });

  it('should be created', inject([ThumbnailsphotoService], (service: ThumbnailsphotoService) => {
    expect(service).toBeTruthy();
  }));
});
