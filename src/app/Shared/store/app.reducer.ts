import * as fromShoppingList from './shopping-list.reducer'
import * as fromAuth from './auth.reducer'
import * as fromRecipes from 'src/app/recipes/store/recipe.reducer'
import { ActionReducerMap } from '@ngrx/store';

export interface AppState{
    shoppingList: fromShoppingList.State;
    auth: fromAuth.State;
    recipes: fromRecipes.State;
}

export const appReducer: ActionReducerMap<AppState> = {
    shoppingList: fromShoppingList.shopingListReducer,
    auth: fromAuth.authReducer,
    recipes: fromRecipes.recipeReducer
};