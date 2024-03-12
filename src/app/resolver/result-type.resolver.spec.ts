import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { resultTypeResolver } from './result-type.resolver';

describe('resultTypeResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => resultTypeResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
