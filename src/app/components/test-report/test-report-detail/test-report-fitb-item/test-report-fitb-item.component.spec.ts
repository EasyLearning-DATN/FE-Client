import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestReportFitbItemComponent } from './test-report-fitb-item.component';

describe('TestReportFitbItemComponent', () => {
  let component: TestReportFitbItemComponent;
  let fixture: ComponentFixture<TestReportFitbItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestReportFitbItemComponent]
    });
    fixture = TestBed.createComponent(TestReportFitbItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
