import { TestBed, inject } from '@angular/core/testing';

import { SaplingsurvivalService } from './saplingsurvival.service';

describe('SaplingsurvivalService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SaplingsurvivalService]
    });
  });

  it('should be created', inject([SaplingsurvivalService], (service: SaplingsurvivalService) => {
    expect(service).toBeTruthy();
  }));
});
