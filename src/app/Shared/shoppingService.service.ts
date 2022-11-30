import { EventEmitter, Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingridient } from "./ingridient.model";
import { LoggingService } from "./logging.service";

@Injectable()
export class shoppingService{
    ingridientChanged = new Subject<Ingridient[]>();
    startedEditing = new Subject<number>();
   private ingridients: Ingridient[] = [
    
        new Ingridient('Potato', 5),
        new Ingridient('Tomato', 15)
    ]
    
    statusUpdated = new Subject<string>();
    constructor(private loggingService: LoggingService) { }

    getIngridients() {
        return this.ingridients.slice();
    }
    
    getIngridient(index:number) {
        return this.ingridients[index];
    }
    onAddIngridient(item: Ingridient) {
        item.name=item.name.charAt(0).toUpperCase() + item.name.slice(1)
        
        if (this.ingridients.find(x =>x.name===item.name)) {
            let id = this.ingridients.findIndex(x => x.name === item.name);
            let currentAmount: number = this.ingridients[id].amount;
            
            this.ingridients[id].amount= Number(item.amount) + Number(currentAmount)
            
        }
        else {
            this.ingridients.push(item);
            this.ingridientChanged.next(this.ingridients.slice());
            console.log(item)
        }
    }
    onAddIngridients(items:Ingridient[]) {
      
        this.ingridients.push(...items);
        this.ingridientChanged.next(this.ingridients.slice());

    }
    updateIngridient(index: number, newIngridient: Ingridient) {
        this.ingridients[index] = newIngridient;
        this.ingridientChanged.next(this.ingridients.slice());
    }
    deleteIngridient(index: number) {
        this.ingridients.splice(index,1)
        this.ingridientChanged.next(this.ingridients.slice());
      }

}