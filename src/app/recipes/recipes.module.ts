import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { AuthGuard } from "../auth.guard";
import { AuthService } from "../auth.service";
import { LoggingService2 } from "../logging.Service";
import { CanDeactivateGuard } from "../routing-module/servers/edit-server/can-deactivate-guard.service";
import { serverResolver } from "../routing-module/servers/server-resolver.service";
import { ServersService } from "../routing-module/servers/servers.service";
import { AccountService } from "../Shared/AccountService.service";
import { AuthInteceptorService } from "../Shared/authInterceptor.service";
import { countService } from "../Shared/countService.service";
import { LoggingService } from "../Shared/logging.service";
import { LoggingInteceptorService } from "../Shared/loggingIntercepor.service";
import { recipeService } from "../Shared/recipeService.service";
import { sharedModule } from "../Shared/shared.module";
import { shoppingService } from "../Shared/shoppingService.service";
import { UsersService } from "../Shared/UsersServices.service";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipeHomeComponent } from "./recipe-home/recipe-home.component";
import { RecipeItemComponent } from "./recipe-list/recipe-item/recipe-item.component";
import { RecipeListComponent } from "./recipe-list/recipe-list.component";
import { recipeResolver } from "./recipe-resolver.service";
import { RecipeRoutingModule } from "./recipes-routing.module";
import { RecipesComponent } from "./recipes.component";

@NgModule({
    declarations: [
        RecipesComponent,
        RecipeHomeComponent,
        RecipeEditComponent,
        RecipeListComponent,
        RecipeItemComponent,
        RecipeDetailComponent,
        RecipesComponent,
    ],
    imports: [RouterModule, sharedModule, FormsModule,  ReactiveFormsModule, RecipeRoutingModule],
    exports: [
        RecipesComponent,
        RecipeHomeComponent,
        RecipeEditComponent,
        RecipeListComponent,
        RecipeItemComponent,
        RecipeDetailComponent,
        RecipesComponent,
        RecipeRoutingModule
    ],
    providers: [AccountService, LoggingService, UsersService,countService, shoppingService, recipeService,ServersService, AuthService, AuthGuard, CanDeactivateGuard, serverResolver, recipeResolver,{provide: HTTP_INTERCEPTORS,useClass: AuthInteceptorService, multi:true},{provide: HTTP_INTERCEPTORS,useClass: LoggingInteceptorService, multi:true},LoggingService2],
})
export class recipesModule{

}