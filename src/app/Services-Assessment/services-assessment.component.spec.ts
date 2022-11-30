import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicesAssessmentComponent } from './services-assessment.component';

describe('ServicesAssessmentComponent', () => {
  let component: ServicesAssessmentComponent;
  let fixture: ComponentFixture<ServicesAssessmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServicesAssessmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicesAssessmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
