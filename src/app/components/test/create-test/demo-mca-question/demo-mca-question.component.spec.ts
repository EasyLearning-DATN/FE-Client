import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoMcaQuestionComponent } from './demo-mca-question.component';

describe('DemoMcaQuestionComponent', () => {
  let component: DemoMcaQuestionComponent;
  let fixture: ComponentFixture<DemoMcaQuestionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DemoMcaQuestionComponent]
    });
    fixture = TestBed.createComponent(DemoMcaQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
