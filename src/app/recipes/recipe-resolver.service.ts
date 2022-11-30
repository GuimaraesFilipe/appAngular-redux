import { Injectable } from "@angular/core";
import { ActivatedRoute, ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable, of } from "rxjs";
import { recipeService } from "../Shared/recipeService.service";
import { Recipe } from "./recipe.model";
import * as fromApp from 'src/app/Shared/store/app.reducer'
import { Store } from "@ngrx/store";
import * as RecipesActions from 'src/app/recipes/store/recipe.actions'
import { Actions, ofType } from "@ngrx/effects";
import { map, switchMap, take } from "rxjs/operators";

@Injectable()
export class recipeResolver implements Resolve< Recipe[] >{

    constructor(private recipeService: recipeService, private store: Store<fromApp.AppState>, private actions$: Actions ){}
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
        // console.log(this.recipeService.onRecipeSelected(+route.params['id']));
        // return this.recipeService.onRecipeSelected(+route.params['id']);
        return this.store.select('recipes').pipe(
            take(1),
            map(recipeState => {
            return recipeState.recipes;
            }),
            switchMap(recipes => {
            if (recipes.length === 0) {
                this.store.dispatch(new RecipesActions.FetchRecipes());
                return this.actions$.pipe(
                    ofType(RecipesActions.SET_RECIPES),
                    take(1)
                )
            } else {
                return of(recipes)
            }
            })
        )
     
    }
}