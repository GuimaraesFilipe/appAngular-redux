import { Component, Input, OnInit } from '@angular/core';
import { UsersService } from 'src/app/Shared/UsersServices.service';

@Component({
  selector: 'app-inactive-users',
  templateUrl: './inactive-users.component.html',
  styleUrls: ['./inactive-users.component.css']
})
export class InactiveUsersComponent implements OnInit {
  @Input() id: number;
  @Input('Iuser') inactiveUsers: {name: string, status: string };
  
  constructor(private userServices: UsersService) { }


  ngOnInit(): void {
  }
  setActive(id:number,status:string) {
    this.userServices.onSetActive(id)
  
   
  }

}
