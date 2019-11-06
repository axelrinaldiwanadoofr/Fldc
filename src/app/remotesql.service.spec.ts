import { TestBed } from '@angular/core/testing';

import { RemotesqlService } from './remotesql.service';

describe('RemotesqlService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RemotesqlService = TestBed.get(RemotesqlService);
    expect(service).toBeTruthy();
  });
});
