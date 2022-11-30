import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { validators } from '@ionic/cli-framework';
import { Observable } from 'rxjs';
import { timeout } from 'rxjs/operators';

@Component({
  selector: 'app-reactive-forms',
  templateUrl: './reactive-forms.component.html',
  styleUrls: ['./reactive-forms.component.css']
})
export class ReactiveFormsComponent implements OnInit {
  genders = ['male', 'female'];
  signupForm: FormGroup; //import ReactiveFormsModule in the App module
  forbiddenUsernames= ['Chris','Ana']

  constructor() { }

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      'userdata': new FormGroup({
        'username': new FormControl(null, [Validators.required,
        this.forbiddenNames.bind(this)]), // needs to bind so the value is from inside the class
      'email': new FormControl(null, [Validators.email, Validators.required], this.forbiddenEmails)}),
      
      'gender': new FormControl('male'),
      'hobbies':new FormArray([])
    });
    // this.signupForm.valueChanges.subscribe(
    //   (value) => console.log(value)
    // );
    this.signupForm.statusChanges.subscribe(
      (status) => console.log(status)
    );

    this.signupForm.setValue({
      'userdata': {
        'username': 'default Name',
        'email':'email@default'
      },
      'gender': 'male',
      'hobbies':[]
    })

    this.signupForm.patchValue({
      'userdata': {
        'username':'Filipe'
      }
    })
  }

  onSubmit() {
    console.log(this.signupForm)

  }

  get controls() {
    
    return (this.signupForm.get('hobbies') as FormArray).controls;
  }
  onAddHobby() {
    const control = new FormControl(null, Validators.required);
   (<FormArray> this.signupForm.get('hobbies')).push(control)

  }

  forbiddenNames(control: FormControl): { [s: string]: boolean }{ //creating custom validator
    if (this.forbiddenUsernames.indexOf(control.value) !== -1) {
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

