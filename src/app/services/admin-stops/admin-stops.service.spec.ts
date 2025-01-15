import { TestBed } from '@angular/core/testing';

import { AdminStopsService } from './admin-stops.service';

describe('AdminStopsService', () => {
  let service: AdminStopsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminStopsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
