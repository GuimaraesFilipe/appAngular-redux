import { CommonModule } from "@angular/common";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { AuthGuard } from "../auth.guard";
import { AuthService } from "../auth.service";
import { HTTPrequestsComponent } from "../httprequests/httprequests.component";
import { recipeResolver } from "../recipes/recipe-resolver.service";
import { CanDeactivateGuard } from "../routing-module/servers/edit-server/can-deactivate-guard.service";
import { serverResolver } from "../routing-module/servers/server-resolver.service";
import { ServersService } from "../routing-module/servers/servers.service";
import { AccountService } from "../Shared/AccountService.service";
import { AlertComponent } from "../shared/alert/alert.component";
import { AuthInteceptorService } from "../Shared/authInterceptor.service";
import { countService } from "../Shared/countService.service";
import { LoggingService } from "../Shared/logging.service";
import { LoggingInteceptorService } from "../Shared/loggingIntercepor.service";
import { recipeService } from "../Shared/recipeService.service";
import { sharedModule } from "../Shared/shared.module";
import { shoppingService } from "../Shared/shoppingService.service";
import { UsersService } from "../Shared/UsersServices.service";
import { AuthComponent } from "./auth.component";


@NgModule({
    declarations: [
        AuthComponent,
        HTTPrequestsComponent,
    ],
    imports: [
        sharedModule,
        FormsModule,
        RouterModule.forChild([
        { path: '', component: AuthComponent }
    ])],
    exports: [
        AuthComponent,
        HTTPrequestsComponent,
    ],
    providers: [AccountService, LoggingService, UsersService,countService, shoppingService, recipeService,ServersService, AuthService, AuthGuard, CanDeactivateGuard, serverResolver, recipeResolver,{provide: HTTP_INTERCEPTORS,useClass: AuthInteceptorService, multi:true},{provide: HTTP_INTERCEPTORS,useClass: LoggingInteceptorService, multi:true}],
    entryComponents: [
      AlertComponent
    ]
})
export class authModule{

}