import { TestBed } from '@angular/core/testing';

import { ViewResultTypeService } from './view-result-type.service';

describe('ViewResultTypeService', () => {
  let service: ViewResultTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ViewResultTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
