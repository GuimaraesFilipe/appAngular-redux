import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { map, switchMap, withLatestFrom } from "rxjs/operators";
import * as RecipesActions from 'src/app/recipes/store/recipe.actions'
import { Recipe } from "../recipe.model";
import * as fromApp from 'src/app/Shared/store/app.reducer'
@Injectable()
export class RecipeEffects{
    @Effect()
    fetchRecipes = this.actions$.pipe(ofType(RecipesActions.FETCH_RECIPES),
        switchMap(() => {
            return this.http.get<Recipe[]>('https://front-end-angular-88e1c-default-rtdb.firebaseio.com/recepi.json')
        
    }), map(recipes => { // After the new user token is taken it is used to replace the previous one in the exaustMap and then do the mapping 
          
      
        return recipes.map(recipe => {
          return { ...recipe, ingridients: recipe.ingridients ? recipe.ingridients : [] };
        });
        
      
    }), map(recipes => {
          
        return new RecipesActions.SetRecipes(recipes)
      }));
  
  @Effect({dispatch:false})
  storeRecipes = this.actions$.pipe(ofType(RecipesActions.STORE_RECIPE),
    withLatestFrom(this.store.select('recipes')),
    switchMap(([actionData, recipesState]) => {
      return this.http.put<Recipe[]>(
        'https://front-end-angular-88e1c-default-rtdb.firebaseio.com/recepi.json',
        recipesState.recipes,
        {
          observe: 'response'
        }
      )
      
    }
  ));
    constructor(private actions$:Actions, private http: HttpClient, private store: Store<fromApp.AppState>){}
    
}