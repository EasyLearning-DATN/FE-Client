import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassesJoinedComponent } from './classes-joined.component';

describe('ClassesJoinedComponent', () => {
  let component: ClassesJoinedComponent;
  let fixture: ComponentFixture<ClassesJoinedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClassesJoinedComponent]
    });
    fixture = TestBed.createComponent(ClassesJoinedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
