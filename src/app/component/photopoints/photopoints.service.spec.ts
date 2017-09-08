import { TestBed, inject } from '@angular/core/testing';

import { PhotopointsService } from './photopoints.service';

describe('PhotopointsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PhotopointsService]
    });
  });

  it('should be created', inject([PhotopointsService], (service: PhotopointsService) => {
    expect(service).toBeTruthy();
  }));
});
