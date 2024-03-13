import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoScaQuestionComponent } from './demo-sca-question.component';

describe('DemoScaQuestionComponent', () => {
  let component: DemoScaQuestionComponent;
  let fixture: ComponentFixture<DemoScaQuestionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DemoScaQuestionComponent]
    });
    fixture = TestBed.createComponent(DemoScaQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
