import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../auth.guard";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipeHomeComponent } from "./recipe-home/recipe-home.component";
import { RecipeListComponent } from "./recipe-list/recipe-list.component";
import { RecipesComponent } from "./recipes.component";
import { RecipeResolverService } from "./recipesResolver.service";


const routes: Routes = [

          {
            path: '', component: RecipeListComponent, children: [
              { path: '', component: RecipeHomeComponent },
              { path: 'new', component: RecipeEditComponent },
              { path: ':id', component: RecipeDetailComponent, resolve:[RecipeResolverService]},
              { path: ':id/edit', component: RecipeEditComponent }
             
            ]
          }
          
          
        ]
      
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports:[RouterModule]

})

export class RecipeRoutingModule{


}