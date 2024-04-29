import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportlessonComponent } from './reportlesson.component';

describe('ReportlessonComponent', () => {
  let component: ReportlessonComponent;
  let fixture: ComponentFixture<ReportlessonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReportlessonComponent]
    });
    fixture = TestBed.createComponent(ReportlessonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
