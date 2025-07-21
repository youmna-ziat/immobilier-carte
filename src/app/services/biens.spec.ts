import { TestBed } from '@angular/core/testing';

import { Biens } from './biens';

describe('Biens', () => {
  let service: Biens;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Biens);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
