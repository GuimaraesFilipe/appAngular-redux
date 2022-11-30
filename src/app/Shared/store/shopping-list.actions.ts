import { Action } from "@ngrx/store";
import { Ingridient } from "src/app/Shared/ingridient.model";

export const Add_ingridient = '[Shopping List] Add Ingridient';
export const Add_ingridients = '[Shopping List] Add Ingridients';
export const Update_ingridient = '[Shopping List] Update Ingridient';
export const Delete_ingridient = '[Shopping List] Delete Ingridient';
export const Start_Edit = '[Shopping List] Start Edit';
export const Stop_Edit = '[Shopping List] Stop Edit';
export class AddIngridient implements Action {
    readonly type = Add_ingridient;
    
    constructor(public payload: Ingridient) {
        
    }

}

export class AddIngridients implements Action {
    readonly type = Add_ingridients;
    
    constructor(public payload: Ingridient[]) {
        
    }

}

export class UpdateIngridients implements Action {
    readonly type = Update_ingridient;
    
    constructor(public payload: Ingridient) {
        
    }

}

export class DeleteIngridients implements Action {
    readonly type = Delete_ingridient;
    
    
}

export class StartEdit implements Action {
    readonly type = Start_Edit;
    
    constructor(public payload: number) {
        
    }

}

export class StopEdit implements Action {
    readonly type = Stop_Edit;
    
  

}

export type ShoppingListActions = AddIngridient | AddIngridients | UpdateIngridients | DeleteIngridients | StartEdit | StopEdit;