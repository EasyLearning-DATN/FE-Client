import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonLearnItemComponent } from './lesson-learn-item.component';

describe('LessonLearnItemComponent', () => {
  let component: LessonLearnItemComponent;
  let fixture: ComponentFixture<LessonLearnItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LessonLearnItemComponent]
    });
    fixture = TestBed.createComponent(LessonLearnItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
