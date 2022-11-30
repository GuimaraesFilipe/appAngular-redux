import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsAssessmentComponent } from './forms-assessment.component';

describe('FormsAssessmentComponent', () => {
  let component: FormsAssessmentComponent;
  let fixture: ComponentFixture<FormsAssessmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormsAssessmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormsAssessmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
