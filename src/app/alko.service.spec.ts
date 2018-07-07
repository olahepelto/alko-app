import { TestBed, inject } from '@angular/core/testing';

import { AlkoService } from './alko.service';

describe('AlkoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AlkoService]
    });
  });

  it('should be created', inject([AlkoService], (service: AlkoService) => {
    expect(service).toBeTruthy();
  }));
});
