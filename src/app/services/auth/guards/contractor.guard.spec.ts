import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { contractorGuard } from './contractor.guard';

describe('contractorGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => contractorGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
