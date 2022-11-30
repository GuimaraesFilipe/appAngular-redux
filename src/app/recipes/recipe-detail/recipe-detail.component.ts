import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Ingridient } from 'src/app/Shared/ingridient.model';
import { recipeService } from 'src/app/Shared/recipeService.service';
import { Recipe } from '../recipe.model';
import * as fromApp from 'src/app/Shared/store/app.reducer'
import * as RecipesActions from 'src/app/recipes/store/recipe.actions'
import * as shoppinglistActions from 'src/app/Shared/store/shopping-list.actions'
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
 
  id: number;
  recipeDetails: Recipe;
  paramsSubscription:Subscription
  constructor(private recipeService: recipeService, private route:ActivatedRoute, private router:Router, private store: Store<fromApp.AppState> ) { }

  ngOnInit(): void {
    this.paramsSubscription = this.route.params.pipe(map(params => {
      return +params['id'];
    }), switchMap(id => {
      this.id = id;
      return this.store.select('recipes');
   }),map(recipeState =>
    {
      return recipeState.recipes.find((recipe, index) => {
        return index === this.id;
      });
    })).subscribe(recipe => {
          this.recipeDetails = recipe;
        })
      
 
  }
  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
  
}
  
  addToShoppingList() {

    // this.recipeService.addToShopping(this.recipeDetails.ingridients)
    this.store.dispatch(new shoppinglistActions.AddIngridients(this.recipeDetails.ingridients))
    
  }
  EditRecipe() {
    this.router.navigate(['edit'], {relativeTo:this.route})
  }

  deleteRecipe() {
    // this.recipeService.deleteRecipe(this.recipeDetails['id'])
    
    this.store.dispatch(new RecipesActions.DeleteRecipe(this.id))
    this.router.navigate(['recipeList'])
  }

}
