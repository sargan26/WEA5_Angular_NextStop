import { TestBed } from '@angular/core/testing';

import { AdminRoutesService } from './admin-routes.service';

describe('AdminRoutesService', () => {
  let service: AdminRoutesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminRoutesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
