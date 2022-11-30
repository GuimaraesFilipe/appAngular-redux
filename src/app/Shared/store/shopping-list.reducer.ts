import { Action } from "@ngrx/store";
import { Ingridient } from "src/app/Shared/ingridient.model";
import * as ShoppingListActions from "./shopping-list.actions";



export interface State{
    ingridients: Ingridient[],  
    editedIngridient: Ingridient,
    editedIngridientIndex: number

}



const initialState: State= {
    ingridients:  [
    
        new Ingridient('Potato', 5),
        new Ingridient('Tomato', 15)
    ],  
    editedIngridient: null,
    editedIngridientIndex:-1
};

export function shopingListReducer(state: State = initialState, action: ShoppingListActions.ShoppingListActions) {
    switch (action.type) {
        case ShoppingListActions.Add_ingridient:
            return {
                ...state, //copying the old state and the overwriting what you want to change
                ingridients:[...state.ingridients, action.payload]
            };
        case ShoppingListActions.Add_ingridients:
            return {
                ...state, //copying the old state and the overwriting what you want to change
                ingridients:[...state.ingridients, ...action.payload]
            }
        case ShoppingListActions.Update_ingridient:
            const ingridient = state.ingridients[state.editedIngridientIndex]
            const updateIngridient = {
                ...ingridient,
                ...action.payload
            }
            const updateIngridients = [...state.ingridients];
            updateIngridients[state.editedIngridientIndex]= updateIngridient
                return {
                    ...state, //copying the old state and the overwriting what you want to change
                    ingridients: updateIngridients,
                    editedIngridientIndex: -1,
                    editedIngridient: null
            }
        case ShoppingListActions.Delete_ingridient:
            
                return {
                    ...state, //copying the old state and the overwriting what you want to change
                    ingridients: state.ingridients.filter((ig, igIndex )=> {
                        return igIndex !== state.editedIngridientIndex;
                    }),
                    editedIngridientIndex: -1,
                    editedIngridient: null
            }
        case ShoppingListActions.Start_Edit:

            
            return {
                ...state,
                editedIngridientIndex: action.payload,
                editedIngridient: { ...state.ingridients[action.payload] }
            };
        case ShoppingListActions.Stop_Edit:
            return {
                ...state,
                editedIngridient: null,
                editedIngridientIndex:-1
            };
        default:
            return state;
    }

}