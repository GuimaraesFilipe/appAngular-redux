import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { LoggingService2 } from '../logging.Service';
import { Ingridient } from '../Shared/ingridient.model';
import { shoppingService } from '../Shared/shoppingService.service';
import * as fromApp from '../Shared/store/app.reducer'
import * as ShoppingListActions from '../Shared/store/shopping-list.actions'


@Component({
  selector: 'app-shoppingList',
  templateUrl: './shoppingList.html',
  styleUrls: ['./shoppingList.css'],
 
})
export class shoppingList implements OnInit, OnDestroy {
  ingridients: Observable<{ingridients: Ingridient[] }>
 private activeSubs: Subscription;

  constructor(private shoppingService: shoppingService, private loggingService: LoggingService2, private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.ingridients=this.store.select('shoppingList')
    // this.ingridients = this.shoppingService.getIngridients();
    // this.activeSubs=this.shoppingService.ingridientChanged.subscribe(
    //   (ing: Ingridient[]) => { this.ingridients = ing })
    
    this.loggingService.printLog('Hello from Shopping list ' + this.ingridients)
  }
  ngOnDestroy(): void {
    // this.activeSubs.unsubscribe();
  }

  onEditItem(index: number) {
    // this.shoppingService.startedEditing.next(index);
    this.store.dispatch(new ShoppingListActions.StartEdit(index));
   
 }

 
}
