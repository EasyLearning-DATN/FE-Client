import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FunnyWheelsComponent } from './funny-wheels.component';

describe('FunnyWheelsComponent', () => {
  let component: FunnyWheelsComponent;
  let fixture: ComponentFixture<FunnyWheelsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FunnyWheelsComponent]
    });
    fixture = TestBed.createComponent(FunnyWheelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
