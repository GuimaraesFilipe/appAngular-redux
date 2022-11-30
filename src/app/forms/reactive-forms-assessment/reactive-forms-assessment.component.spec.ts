import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactiveFormsAssessmentComponent } from './reactive-forms-assessment.component';

describe('ReactiveFormsAssessmentComponent', () => {
  let component: ReactiveFormsAssessmentComponent;
  let fixture: ComponentFixture<ReactiveFormsAssessmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReactiveFormsAssessmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReactiveFormsAssessmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
