import { Component, OnInit } from '@angular/core';
import {  FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-reactive-forms-assessment',
  templateUrl: './reactive-forms-assessment.component.html',
  styleUrls: ['./reactive-forms-assessment.component.css']
})
export class ReactiveFormsAssessmentComponent implements OnInit {
  projectForm: FormGroup;
  defaultStatus = 'Stable';
  forbiddenProjectnames = ['test', 'project']
  print = false;

  constructor() { }

  ngOnInit(): void {
    this.projectForm = new FormGroup({
      'projectData': new FormGroup({
        'projectname': new FormControl(null, [Validators.required,
          this.forbiddenNames.bind(this)]), // needs to bind so the value is from inside the class
      'email': new FormControl(null, [Validators.email, Validators.required], this.forbiddenEmails)}),
      
      'status': new FormControl('Critical')
    });

    this.projectForm.setValue({
      'projectData': {
        'projectname': 'Reactive Forms Assessment',
        'email':''
      },
      'status':''
    })

    this.projectForm.statusChanges.subscribe(
      (status) => console.log(status)
    );
  }

  onSubmit() {
  
      console.log(this.projectForm);
    
    
  }

  forbiddenNames(control: FormControl): { [s: string]: boolean }{ //creating custom validator
    if (this.forbiddenProjectnames.indexOf(control.value) !== -1) {
      return { 'nameIsForbidden': true };
    }
    return null;
  
  }

  forbiddenEmails(control: FormControl): Promise<any> | Observable<any>{ //Async validator 
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'test@test.com') {
          resolve({ 'emailIsForbidden': true });
        }
        else {
          resolve(null);
        }
      }, 1500);
    });
    return promise;
  }

  

}
