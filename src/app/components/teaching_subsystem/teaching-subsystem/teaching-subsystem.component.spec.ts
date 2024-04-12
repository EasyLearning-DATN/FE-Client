import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeachingSubsystemComponent } from './TeachingSubsystemComponent';

describe('TeachingSubsystemComponent', () => {
  let component: TeachingSubsystemComponent;
  let fixture: ComponentFixture<TeachingSubsystemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TeachingSubsystemComponent]
    });
    fixture = TestBed.createComponent(TeachingSubsystemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
