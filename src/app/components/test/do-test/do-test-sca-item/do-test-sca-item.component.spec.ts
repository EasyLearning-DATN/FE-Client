import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoTestScaItemComponent } from './do-test-sca-item.component';

describe('DoTestScaItemComponent', () => {
  let component: DoTestScaItemComponent;
  let fixture: ComponentFixture<DoTestScaItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DoTestScaItemComponent]
    });
    fixture = TestBed.createComponent(DoTestScaItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
