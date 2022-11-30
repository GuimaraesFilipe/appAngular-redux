import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessmentDataBindingComponent } from './assessment-data-binding.component';

describe('AssessmentDataBindingComponent', () => {
  let component: AssessmentDataBindingComponent;
  let fixture: ComponentFixture<AssessmentDataBindingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssessmentDataBindingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssessmentDataBindingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
