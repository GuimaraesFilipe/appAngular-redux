import { Component, OnInit } from '@angular/core';
import { AccountService } from '../Shared/AccountService.service';
import { UsersService } from '../Shared/UsersServices.service';

@Component({
  selector: 'app-services-assessment',
  templateUrl: './services-assessment.component.html',
  styleUrls: ['./services-assessment.component.css']
})
export class ServicesAssessmentComponent implements OnInit {
  activeUsers: { name: string, status: string }[] = [];
  inactiveUsers: { name: string, status: string }[] = [];
  
  constructor(private userServices: UsersService, private accService:AccountService) { }

  ngOnInit(): void {
    this.activeUsers = this.userServices.active;
    this.inactiveUsers = this.userServices.inactive;
   
    


  }

}
