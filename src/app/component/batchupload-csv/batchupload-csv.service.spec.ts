import { TestBed, inject } from '@angular/core/testing';

import { BatchuploadCsvService } from './batchupload-csv.service';

describe('BatchuploadCsvService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BatchuploadCsvService]
    });
  });

  it('should be created', inject([BatchuploadCsvService], (service: BatchuploadCsvService) => {
    expect(service).toBeTruthy();
  }));
});
