import { Component, EventEmitter, Output } from '@angular/core';
import { AccountService } from 'src/app/Shared/AccountService.service';
import { LoggingService } from 'src/app/Shared/logging.service';

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.css'],
 
})
export class NewAccountComponent {
  @Output() accountAdded = new EventEmitter<{name: string, status: string}>();

  constructor(private accService: AccountService) {
    this.accService.statusUpdated.subscribe(
      (status:string)=> alert('New Status:' + status)
    )
  }

  onCreateAccount(accountName: string, accountStatus: string) {
    this.accService.onAccountAdded(accountName, accountStatus);
   
  }
}
