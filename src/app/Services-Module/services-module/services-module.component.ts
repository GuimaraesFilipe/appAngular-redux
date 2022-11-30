import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/Shared/AccountService.service';
import { LoggingService } from 'src/app/Shared/logging.service';
import { AccountComponent } from './account/account.component';

@Component({
  selector: 'app-services-module',
  templateUrl: './services-module.component.html',
  styleUrls: ['./services-module.component.css'],
  providers:[]
})
export class ServicesModuleComponent implements OnInit {
 accounts: {name:string, status:string}[] =[]

 
  constructor( private accService: AccountService) { }

  ngOnInit(): void {
    this.accounts = this.accService.accounts;
  }
  
}
