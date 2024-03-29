import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestReportScaItemComponent } from './test-report-sca-item.component';

describe('TestReportScaItemComponent', () => {
  let component: TestReportScaItemComponent;
  let fixture: ComponentFixture<TestReportScaItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestReportScaItemComponent]
    });
    fixture = TestBed.createComponent(TestReportScaItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
