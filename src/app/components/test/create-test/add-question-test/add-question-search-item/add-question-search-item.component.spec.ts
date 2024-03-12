import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddQuestionSearchItemComponent } from './add-question-search-item.component';

describe('AddQuestionSearchItemComponent', () => {
  let component: AddQuestionSearchItemComponent;
  let fixture: ComponentFixture<AddQuestionSearchItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddQuestionSearchItemComponent]
    });
    fixture = TestBed.createComponent(AddQuestionSearchItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
