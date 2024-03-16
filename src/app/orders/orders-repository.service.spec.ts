import { TestBed } from '@angular/core/testing';

import { OrdersRepositoryService } from './orders-repository.service';

describe('OrdersRepositoryService', () => {
  let service: OrdersRepositoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrdersRepositoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
