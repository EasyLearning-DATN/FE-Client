import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditQuestionItemComponent } from './edit-question-item.component';

describe('EditQuestionItemComponent', () => {
  let component: EditQuestionItemComponent;
  let fixture: ComponentFixture<EditQuestionItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditQuestionItemComponent]
    });
    fixture = TestBed.createComponent(EditQuestionItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
