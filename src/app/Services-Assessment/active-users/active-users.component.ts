import { Component, EventEmitter, Input, OnInit } from '@angular/core';

import { UsersService } from 'src/app/Shared/UsersServices.service';

@Component({
  selector: 'app-active-users',
  templateUrl: './active-users.component.html',
  styleUrls: ['./active-users.component.css']
})
export class ActiveUsersComponent implements OnInit {
  @Input() id: number;
  @Input('user') activeUsers: { name: string, status: string };

  constructor(private userServices: UsersService) { }

  ngOnInit(): void {
    
  }

  setInactive(id: number, status: string) {
    this.userServices.onSetInactive(id);
    
    
 
  }
 

}
