import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoFitbQuestionComponent } from './demo-fitb-question.component';

describe('DemoFitbQuestionComponent', () => {
  let component: DemoFitbQuestionComponent;
  let fixture: ComponentFixture<DemoFitbQuestionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DemoFitbQuestionComponent]
    });
    fixture = TestBed.createComponent(DemoFitbQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
