import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { EventEmitter, Injectable } from "@angular/core";
import { Subject, throwError,iif, pipe } from "rxjs";
import { catchError, filter, map, tap, take, exhaustMap } from "rxjs/operators";
import { RecipeEditComponent } from "../recipes/recipe-edit/recipe-edit.component";
import { Recipe } from "../recipes/recipe.model";
import { AuthProject } from "./auth-project.service";
import { Ingridient } from "./ingridient.model";
import { LoggingService } from "./logging.service";
import {Store} from "@ngrx/store";
import { shoppingService } from "./shoppingService.service";
import * as ShoppingListActions from "src/app/Shared/store/shopping-list.actions";
import * as fromApp from 'src/app/Shared/store/app.reducer'
import * as RecipesActions from 'src/app/recipes/store/recipe.actions'

@Injectable()
export class recipeService{
  recipeChanged = new Subject<Recipe[]>();
    recipeArrayDefault: Recipe[] = [
      new Recipe(1, 'Test Recipe', 'This is a test', 'https://www.bing.com/th/id/OIP.Z2UqjvJJVRaPzyCvj8ZNMAHaE8?pid=ImgDet&rs=1',
        [new Ingridient ('Potato',5), new Ingridient ('Tomato',2), new Ingridient ('beef',4)]),
      new Recipe( 2,'Test 2', 'This is a test', 'https://www.bing.com/th/id/OIP.JUm-z0V2FHnYVggo7uAVHAHaF3?pid=ImgDet&rs=1',
      [new Ingridient ('Salada',5), new Ingridient ('fish',2), new Ingridient ('chips',4)])
      ];
  private recipeArray: Recipe[] = [];
      recipeSelected= new Subject<Recipe>();
      recipeDetails: Recipe;
  
  error: any;
  
    
    
    constructor(private shoppingService: shoppingService, private http: HttpClient, private auth:AuthProject, private store: Store<fromApp.AppState>) { }
  

  addToShopping(ingSelected: Ingridient[]) {
    // ingSelected.forEach(element => {
    //   console.log(element);
    //   this.shoppingService.onAddIngridient(element);
      
    // }); 

    
    // this.shoppingService.onAddIngridients(ingSelected)
    this.store.dispatch(new ShoppingListActions.AddIngridients(ingSelected));
        
  }
  //replaced with routing

  setRecipes(recipes: Recipe[]) {
    
    this.recipeArray = recipes;
     this.recipeChanged.next(this.recipeArray.slice());
    
  }
  getRecipes() {
    
    return this.recipeArray.slice();
    
  }
  onRecipeSelected(index: number) {
    
    
    return this.recipeArray[index];
    
  }

  addRecipe(recipe: Recipe) {
    this.recipeArray.push(recipe)
    // this.onSave();
   return this.recipeChanged.next(this.recipeArray.slice());
    
  }
  
  editRecipe(index: number, newRecipe: Recipe) {
    this.recipeArray[index] = newRecipe
    // this.onSave();
    return this.recipeChanged.next(this.recipeArray.slice());
    
  }

  deleteRecipe(id: number) {
    let index=this.recipeArray.findIndex(x => x.id === id)
    this.recipeArray.splice(index, 1)
    // this.onSave();
    return this.recipeChanged.next(this.recipeArray.slice());
   
    
  }
  onSave() {
   
    console.log('saving array',this.recipeArray[0])
    
    this.http.put<Recipe[]>(
      'https://front-end-angular-88e1c-default-rtdb.firebaseio.com/recepi.json',
      this.recipeArray,
      {
        observe: 'response'
      }
    )
    .subscribe(responseData => {
      console.log(responseData);
    }, error => {
      this.error.next(error.message);
    });

    this.fetchPost();

  }

  fetchPost() {
   return  this.auth.userSubject.pipe(take(1), // Take operator takes one value and then unsubscribe
      exhaustMap(user => { // exaustMap operator uses the data from the preivous observable and replace it with the new observable 
        return this.http.get<Recipe[]>('https://front-end-angular-88e1c-default-rtdb.firebaseio.com/recepi.json')
        .pipe(map(recipes => { // After the new user token is taken it is used to replace the previous one in the exaustMap and then do the mapping 
          
      
          return recipes.map(recipe => {
            return { ...recipe, ingridients: recipe.ingridients ? recipe.ingridients : [] };
          });
          
        
        }),
          tap(recipes => {
            // this.setRecipes(recipes)
            console.log(recipes)
            this.store.dispatch(new RecipesActions.SetRecipes(recipes));
          }))
      })
     
      

    )
                                                              
   
        
 
    
  }
  
  deleteAllPost() {
     this.http.delete('https://front-end-angular-88e1c-default-rtdb.firebaseio.com/recepi.json',
      {
        observe: 'events',
        responseType: 'text'
       }).subscribe();
    const recipe = []
    this.setRecipes(recipe);
      
  }
  
  setDefaultRecepis() {

    if (this.recipeArray.length === 0) {
      this.http.put<Recipe[]>(
        'https://front-end-angular-88e1c-default-rtdb.firebaseio.com/recepi.json',
        this.recipeArrayDefault,
        {
          observe: 'response'
        }
      )
        .subscribe(responseData => {
          console.log(responseData);
        }, error => {
          this.error.next(error.message);
        });
        this.fetchPost().subscribe();
    }
    else
      alert('Clear your recipe list before you can set it to the default one'+ this.recipeArray.length )

   

  }
}