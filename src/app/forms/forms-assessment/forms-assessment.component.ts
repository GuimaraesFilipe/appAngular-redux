import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-forms-assessment',
  templateUrl: './forms-assessment.component.html',
  styleUrls: ['./forms-assessment.component.css']
})
export class FormsAssessmentComponent implements OnInit {
  @ViewChild('f') signUpForm: NgForm;
  subscription = ['Basic', 'Advanced',"Pro"];
  user = {
    mail:'',subs:'',password:'****'
  }
  submitted = false;
  defaultSub='Advanced'
  constructor() { }

  ngOnInit(): void {
  }
  onsubmit() { //getting access to the form using ViewChild 
    console.log(this.signUpForm)
  
    this.user.mail = this.signUpForm.value.userData.email;
    this.user.subs = this.signUpForm.value.subscription;
    this.submitted = true;
    this.signUpForm.reset();
    
  }
  

}
