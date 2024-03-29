import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoTestFitbItemComponent } from './do-test-fitb-item.component';

describe('DoTestFitbItemComponent', () => {
  let component: DoTestFitbItemComponent;
  let fixture: ComponentFixture<DoTestFitbItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DoTestFitbItemComponent]
    });
    fixture = TestBed.createComponent(DoTestFitbItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
