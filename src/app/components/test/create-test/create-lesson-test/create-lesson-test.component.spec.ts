import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateLessonTestComponent } from './create-lesson-test.component';

describe('CreateLessonTestComponent', () => {
  let component: CreateLessonTestComponent;
  let fixture: ComponentFixture<CreateLessonTestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateLessonTestComponent]
    });
    fixture = TestBed.createComponent(CreateLessonTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
