import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { AuthGuard } from "./auth.guard";
import { AuthService } from "./auth.service";
import { recipeResolver } from "./recipes/recipe-resolver.service";
import { CanDeactivateGuard } from "./routing-module/servers/edit-server/can-deactivate-guard.service";
import { serverResolver } from "./routing-module/servers/server-resolver.service";
import { ServersService } from "./routing-module/servers/servers.service";
import { AccountService } from "./Shared/AccountService.service";
import { AuthInteceptorService } from "./Shared/authInterceptor.service";
import { countService } from "./Shared/countService.service";
import { LoggingService } from "./Shared/logging.service";
import { LoggingInteceptorService } from "./Shared/loggingIntercepor.service";
import { recipeService } from "./Shared/recipeService.service";
import { shoppingService } from "./Shared/shoppingService.service";
import { UsersService } from "./Shared/UsersServices.service";
import { shoppingList } from "./ShoppingList/shoppingList";

@NgModule({
    providers: [AccountService, LoggingService, UsersService,countService, shoppingService, recipeService,ServersService, AuthService, AuthGuard, CanDeactivateGuard, serverResolver, recipeResolver,{provide: HTTP_INTERCEPTORS,useClass: AuthInteceptorService, multi:true},{provide: HTTP_INTERCEPTORS,useClass: LoggingInteceptorService, multi:true}],

})
export class coreModule{
    


}