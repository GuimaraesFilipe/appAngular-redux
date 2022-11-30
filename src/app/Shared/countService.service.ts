
import { EventEmitter, Injectable } from "@angular/core";
import { LoggingService } from "./logging.service";
import { UsersService } from "./UsersServices.service";

@Injectable()
export class countService{

    

   
    activeCount(activeNo: number) {
       
 
        activeNo++;
    
        return activeNo;

        
        

       

    }
   
    inactiveCount(inactiveNo: number) {
        
 
       
        return ++inactiveNo;
            
  
      
  }
    

}