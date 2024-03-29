import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoTestMcaItemComponent } from './do-test-mca-item.component';

describe('DoTestMcaItemComponent', () => {
  let component: DoTestMcaItemComponent;
  let fixture: ComponentFixture<DoTestMcaItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DoTestMcaItemComponent]
    });
    fixture = TestBed.createComponent(DoTestMcaItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
