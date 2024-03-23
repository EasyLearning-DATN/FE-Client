import { TestBed } from '@angular/core/testing';

import { PaymentSuccessService } from './payment-success.service';

describe('PaymentSuccessService', () => {
  let service: PaymentSuccessService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaymentSuccessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
