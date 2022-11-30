import { Component, ElementRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'forms-root',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css']
})
export class FormsComponent {

  @ViewChild('f') signUpForm: NgForm;
  defaultQuestion = 'pet';
  Answer = '';
  gender = ['male', 'female'];
  user = {
    username:'',mail:'',gender:'',secretQuestion:'',answer:''
  }
  submitted = false;
  suggestUserName() {
    const suggestedName = 'Superuser';
    // this.signUpForm.setValue({
    //   userData: {
    //     username: suggestedName,
    //     email:''
    //   },
    //   secret: 'pet',
    //   questionAnswer: '',
    //   gender:'male'
    // })

    this.signUpForm.form.patchValue({
      userData: {
        username:suggestedName
      }
    })
  }
  // onsubmit(form: NgForm) { // Getting the form value created by angular usign the html form to display the data
  //   console.log(form)
  // }
  onsubmit() { //getting access to the form using ViewChild 
    console.log(this.signUpForm)
    this.user.username = this.signUpForm.value.userData.username;
    this.user.mail = this.signUpForm.value.userData.email;
    this.user.secretQuestion = this.signUpForm.value.secret;
    this.user.answer = this.signUpForm.value.questionAnswer;
    this.user.gender = this.signUpForm.value.gender;
    this.submitted = true;
    this.signUpForm.reset();
    
  }
  
}
