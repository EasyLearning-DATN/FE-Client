import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestReportDetailComponent } from './test-report-detail.component';

describe('TestReportDetailComponent', () => {
  let component: TestReportDetailComponent;
  let fixture: ComponentFixture<TestReportDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestReportDetailComponent]
    });
    fixture = TestBed.createComponent(TestReportDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
