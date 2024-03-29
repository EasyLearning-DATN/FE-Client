import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestReportMcaItemComponent } from './test-report-mca-item.component';

describe('TestReportMcaItemComponent', () => {
  let component: TestReportMcaItemComponent;
  let fixture: ComponentFixture<TestReportMcaItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestReportMcaItemComponent]
    });
    fixture = TestBed.createComponent(TestReportMcaItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
