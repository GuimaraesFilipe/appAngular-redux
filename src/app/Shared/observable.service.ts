import { Injectable, EventEmitter } from "@angular/core";
import { Subject } from 'rxjs';


@Injectable({providedIn:'root'})
export class obsService{
    // activatedEmitter = new EventEmitter<boolean>(); using Event Emmitter PASSIVE 
    activatedEmitter = new Subject<boolean>(); //Active can be tirggered by the code which allows to user operators 
    //Don't use Subjects for Output variables in the components
 }