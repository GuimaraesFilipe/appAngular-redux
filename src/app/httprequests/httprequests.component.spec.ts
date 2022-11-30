import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HTTPrequestsComponent } from './httprequests.component';

describe('HTTPrequestsComponent', () => {
  let component: HTTPrequestsComponent;
  let fixture: ComponentFixture<HTTPrequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HTTPrequestsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HTTPrequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
