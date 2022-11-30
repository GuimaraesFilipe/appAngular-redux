import { EventEmitter, Injectable } from "@angular/core";
import { countService } from "./countService.service";
import { LoggingService } from "./logging.service";

@Injectable()
export class UsersService{
  active = [
    {
      name: 'Julia',
      status: 'active',
      activeCount: 0,
      inactiveCount:0
    },
    {
      name: 'Filipe',
      status: 'active',
      activeCount:0,
      inactiveCount:0
    },
    {
      name: 'Ana',
      status: 'active',
      activeCount:0,
      inactiveCount:0
    }
  ];
  inactive = [
    {
      name: 'Heloisa',
      status: 'inactive',
      activeCount:0,
      inactiveCount:0
    },
    {
      name: 'John',
      status: 'inactive',
      activeCount:0,
      inactiveCount:0
    },
    {
      name: 'Andre',
      status: 'inactive',
      activeCount:0,
      inactiveCount:0
    }
  ];
  

  statusUpdated = new EventEmitter<number>();
    constructor(private loggingService: LoggingService,  private countService: countService) { }

    
  onSetActive(id: number) {
    let count = this.countService.activeCount(this.inactive[id].activeCount);
    this.inactive[id].activeCount = count;
    
    this.active.push(this.inactive[id]);
    console.log(this.inactive[id].name , ' Set to active ', this.inactive[id].activeCount, ' times');
    this.inactive.splice(id, 1);
    this.statusUpdated.emit(count)
    
    
   
        
    }
  onSetInactive(id: number) {
    let count = this.countService.inactiveCount(this.active[id].inactiveCount);
    this.active[id].inactiveCount = count;
    
    this.inactive.push(this.active[id]);
    console.log(this.active[id].name, ' Set to inactive ', this.active[id].inactiveCount, ' times');
      this.active.splice(id, 1);
    
      
  } 
    

}