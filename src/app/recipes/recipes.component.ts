import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { recipeService } from '../Shared/recipeService.service';
import { Recipe } from './recipe.model';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {
 
  recipeDets: Recipe;
 
  

  constructor(private recipeService:recipeService) { }

  ngOnInit(): void {
    // replaced with routing
    // this.recipeService.recipeSelected.subscribe(
    //   (recipe: Recipe) => {
    //     this.recipeDets = recipe;
    //   }
    // )
    
  }
  
}
