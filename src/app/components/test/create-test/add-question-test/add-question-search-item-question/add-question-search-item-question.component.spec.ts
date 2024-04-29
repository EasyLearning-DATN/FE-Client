import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddQuestionSearchItemQuestionComponent } from './add-question-search-item-question.component';

describe('AddQuestionSearchItemQuestionComponent', () => {
  let component: AddQuestionSearchItemQuestionComponent;
  let fixture: ComponentFixture<AddQuestionSearchItemQuestionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddQuestionSearchItemQuestionComponent]
    });
    fixture = TestBed.createComponent(AddQuestionSearchItemQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
