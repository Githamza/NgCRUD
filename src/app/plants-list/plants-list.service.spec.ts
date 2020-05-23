import { TestBed } from '@angular/core/testing';

import { PlantsListService } from './plants-list.service';

describe('PlantsListService', () => {
  let service: PlantsListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlantsListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
