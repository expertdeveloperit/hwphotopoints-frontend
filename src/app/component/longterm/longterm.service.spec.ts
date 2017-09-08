import { TestBed, inject } from '@angular/core/testing';

import { LongtermService } from './longterm.service';

describe('LongtermService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LongtermService]
    });
  });

  it('should be created', inject([LongtermService], (service: LongtermService) => {
    expect(service).toBeTruthy();
  }));
});
