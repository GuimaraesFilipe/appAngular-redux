import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AccountService } from 'src/app/Shared/AccountService.service';
import { LoggingService } from 'src/app/Shared/logging.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']

})
export class AccountComponent {
  @Input() id: number;
  @Input() account: {name:string, status: string};

  constructor(private accService: AccountService) {
    
  }

  onSetTo(status: string) {
    this.accService.onStatusChanged(this.id, status);
    this.accService.statusUpdated.emit(status);
   
  }
}
