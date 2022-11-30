import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { recipeService } from 'src/app/Shared/recipeService.service';
import { Recipe } from '../../recipe.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
  @Input('recipeItems') recipeItems: Recipe;
  @Input() index: number;
 
  constructor(private recipeService:recipeService) { }

  ngOnInit(): void {
  }
//   getRecipe() {
//     this.recipeService.recipeSelected.emit(this.recipeItems)
    
//  }
}
