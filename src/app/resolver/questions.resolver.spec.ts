import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { questionsResolver } from './questions.resolver';

describe('questionsResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => questionsResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
