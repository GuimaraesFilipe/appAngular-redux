import { Injectable } from "@angular/core";
import {  ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";

import { recipeService } from "../Shared/recipeService.service";
import { Recipe } from "./recipe.model";
import { RecipesComponent } from "./recipes.component";

@Injectable({ providedIn: 'root' })
    
export class RecipeResolverService implements Resolve<Recipe[]>{

    constructor(private recipeService: recipeService) { }
        
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const recipes = this.recipeService.getRecipes();

        if (recipes.length === 0) {
            return this.recipeService.fetchPost();
        }
        else {
            return recipes;
        }
      }
    
    
 }