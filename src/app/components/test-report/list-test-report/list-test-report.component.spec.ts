import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTestReportComponent } from './list-test-report.component';

describe('ListTestReportComponent', () => {
  let component: ListTestReportComponent;
  let fixture: ComponentFixture<ListTestReportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListTestReportComponent]
    });
    fixture = TestBed.createComponent(ListTestReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
