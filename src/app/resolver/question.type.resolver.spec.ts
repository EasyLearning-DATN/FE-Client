import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { questionTypeResolver } from './question.type.resolver';

describe('questionTypeResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => questionTypeResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
