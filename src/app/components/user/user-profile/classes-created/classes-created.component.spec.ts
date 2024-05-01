import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassesCreatedComponent } from './classes-created.component';

describe('ClassesCreatedComponent', () => {
  let component: ClassesCreatedComponent;
  let fixture: ComponentFixture<ClassesCreatedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClassesCreatedComponent]
    });
    fixture = TestBed.createComponent(ClassesCreatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
