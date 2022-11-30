import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { recipeService } from 'src/app/Shared/recipeService.service';
import { Recipe } from '../recipe.model';
import {Store} from "@ngrx/store";

import * as ShoppingListActions from "src/app/Shared/store/shopping-list.actions";
import * as fromApp from 'src/app/Shared/store/app.reducer'
import * as RecipesActions from 'src/app/recipes/store/recipe.actions'
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [];
  recepiDetailId: Number;
  subscription: Subscription;
  

  constructor(private recipeService:recipeService, private route: ActivatedRoute, private router:Router, private store : Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.recipeService.fetchPost().subscribe((recipes => {
      this.recipes = recipes;
      
    console.log(this.recipes)
      this.subscription = this.store.select('recipes').pipe(map(recipesState =>
        recipesState.recipes)).subscribe((recipes => {
          this.recipes = recipes;
          
      }))
    }));
    
   
     
    

  }

  // getRecipe(id:number) {
  //   this.router.navigate([id], {relativeTo:this.route, queryParamsHandling:'preserve'})
  // }
 

}
