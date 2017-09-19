import { TestBed, inject } from '@angular/core/testing';

import { BatchuploadService } from './batchupload.service';

describe('BatchuploadService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BatchuploadService]
    });
  });

  it('should be created', inject([BatchuploadService], (service: BatchuploadService) => {
    expect(service).toBeTruthy();
  }));
});
