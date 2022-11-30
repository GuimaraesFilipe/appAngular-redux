import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators,ReactiveFormsModule  } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { validators } from '@ionic/cli-framework';
import { recipeService } from 'src/app/Shared/recipeService.service';
import { Recipe } from '../recipe.model';
import * as fromApp from 'src/app/Shared/store/app.reducer'
import * as RecipesActions from 'src/app/recipes/store/recipe.actions'
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { Subscribable, Subscription } from 'rxjs';


@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit, OnDestroy {
  id: number;
  editMode = false;
  recipeForm: FormGroup;
  private storeSub: Subscription
  constructor(private route: ActivatedRoute, private recipeService: recipeService, private router:Router, private store:Store<fromApp.AppState>) { }

  ngOnInit(): void {

    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        this.initForm();
        console.log(this.editMode);
      }
    )
  }
  ngOnDestroy() {
    if (this.storeSub) {
      this.storeSub.unsubscribe();
    }
  }

  onSubmit() {
    // const newRecipe = new Recipe(
    //   this.recipeForm.value['id'],
    //   this.recipeForm.value['name'],
    //   this.recipeForm.value['description'],
    //   this.recipeForm.value['imagePath'],
    //   this.recipeForm.value['ingridients'])

    if (this.editMode) {
      // this.recipeService.editRecipe(this.id, this.recipeForm.value);
      this.store.dispatch(new RecipesActions.UpdateRecipe({ index: this.id, newRecipe: this.recipeForm.value }))
    } else {
      // this.recipeService.addRecipe(this.recipeForm.value);
      this.store.dispatch(new RecipesActions.AddRecipe( this.recipeForm.value))
   
    }
    this.router.navigate(['recipeList'])
  }

  onCancel() {
    this.router.navigate(['recipeList'])
  }
  private initForm() {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    let recipeIngridients = new FormArray([]);
    if (this.editMode) {
      this.storeSub=this.store.select('recipes').pipe(map(recipeState => {
        return recipeState.recipes.find((recipe, index) => {
          return index === this.id;
        })
      })).subscribe(recipe => {
        recipeName = recipe.name;
        recipeImagePath = recipe.imagePath;
        recipeDescription = recipe.description;
        if (recipe['ingridients']) {
          for (let ingridient of recipe.ingridients) {
            recipeIngridients.push(
              new FormGroup({
                'name': new FormControl(ingridient.name, Validators.required),
                'amount': new FormControl(ingridient.amount,[ Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
              })
            )
          }
        }
      })
     
    }

    
    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(recipeImagePath,Validators.required),
      'description': new FormControl(recipeDescription,Validators.required),
      'ingridients': recipeIngridients
    })
    
  }

  get controls() {
    
    return (<FormArray>this.recipeForm.get('ingridients')).controls;
  }
  onAddIngridient() {
    (<FormArray>this.recipeForm.get('ingridients')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [ Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
   })
 )
  }

  deleteingridient(index: number) {
     (<FormArray>this.recipeForm.get('ingridients')).removeAt(index);
  }
}
