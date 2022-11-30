import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { Recipe } from '../recipes/recipe.model';
import { AuthProject } from '../Shared/auth-project.service';
import { recipeService } from '../Shared/recipeService.service';
import { Store } from "@ngrx/store";
import * as fromApp from '../Shared/store/app.reducer'
import { map } from 'rxjs/operators';
import * as fromAuthActions from '../Shared/store/auth.actions'
import * as RecipesActions from 'src/app/recipes/store/recipe.actions'
@Component({
  selector: 'app-header-component',
  templateUrl: './header-component.component.html',
  styleUrls: ['./header-component.component.css']
})
export class HeaderComponentComponent implements OnInit,OnDestroy {
  @Output('rc') recipeClicked = new EventEmitter<boolean>();
  @Output('sp') shoppingClicked = new EventEmitter<boolean>();
  collapsed = true;
  privateSub: Subscription;
  isAuthenticate= false
  constructor(private recepiService: recipeService, private authService :AuthProject, private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.privateSub = this.store.select('auth').pipe(map(authState=> authState.user)).subscribe(user => {
      // this.isAuthenticate = !user ? false : true;
      this.isAuthenticate = !!user;
      console.log(!user)
      console.log (!!user)
    });
    
  }

  recipe() {
    this.recipeClicked.emit(true);
    console.log(this.recipeClicked)
  
  }
  shopping() {
    this.shoppingClicked.emit(true);
    console.log(this.shoppingClicked)
  
    
  }
  onSave() {
    
    this.store.dispatch(new RecipesActions.StoreRecipes());
  }
  onfetch() {
    // this.recepiService.fetchPost().subscribe();
    this.store.dispatch(new RecipesActions.FetchRecipes());
  }
  deleteAll() {
    
    this.recepiService.deleteAllPost();
  }
  Default(){
    this.recepiService.setDefaultRecepis();
  }
  logOut() {
    this.store.dispatch(new fromAuthActions.Logout())
  }
  ngOnDestroy(): void {
    
    this.privateSub.unsubscribe();
  }

}
