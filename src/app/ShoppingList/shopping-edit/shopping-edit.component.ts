import { Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { format } from 'path';
import { Subscription } from 'rxjs';
import { Ingridient } from 'src/app/Shared/ingridient.model';
import { shoppingService } from 'src/app/Shared/shoppingService.service';
import * as ShoppingListActions from "src/app/Shared/store/shopping-list.actions";
import * as fromApp from 'src/app/Shared/store/app.reducer'

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') slForm: NgForm;
subscription: Subscription
  editMode = false;
  editedItem: Ingridient;

  constructor(private shoppingService: shoppingService, private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {

   this.subscription= this.store.select('shoppingList').subscribe(stateData => {
      if (stateData.editedIngridientIndex > -1) {
        this.editMode = true;
        this.editedItem = stateData.editedIngridient;
        this.slForm.setValue({
          name: this.editedItem.name,
          amount:this.editedItem.amount
        })
      }
      else {
        this.editMode=false
      }
    })
    // this.subscription = this.shoppingService.startedEditing.subscribe(
    //   (index: number) => {
    //     this.editedItemIndex = index;
    //     this.editMode = true;
    //     this.editedItem = this.shoppingService.getIngridient(index);
    //     this.slForm.setValue({
    //       name: this.editedItem.name,
    //       amount:this.editedItem.amount
    //     })
    //   }
    // );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.store.dispatch(new ShoppingListActions.StopEdit());
  }

  onAddItem(form: NgForm) {
    const value = form.value;
    const newIngridient = new Ingridient(value.name, value.amount)
    if (this.editMode) {
      // this.shoppingService.updateIngridient(this.editedItemIndex, newIngridient)
      this.store.dispatch(new ShoppingListActions.UpdateIngridients(newIngridient))
      
    } else {
      // this.shoppingService.onAddIngridient(newIngridient)
      this.store.dispatch( new ShoppingListActions.AddIngridient(newIngridient))
    }
  
    this.editMode = false;
    form.reset();
  }

 

  onClear() {
    this.slForm.reset();
    this.store.dispatch(new ShoppingListActions.StopEdit());
  }
  onDelete() {
    // this.shoppingService.deleteIngridient(this.editedItemIndex);

    this.store.dispatch( new ShoppingListActions.DeleteIngridients())
    this.editMode = false;
    this.slForm.reset();
  }
}
