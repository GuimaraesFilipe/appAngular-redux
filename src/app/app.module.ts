import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RootComponentComponent } from './root-component/root-component.component';
import { HeaderComponentComponent } from './header-component/header-component.component';

import { DatabindingComponent } from './databinding/databinding.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CockpitComponent } from './databinding/cockpit/cockpit.component';
import { ServerElementComponent } from './databinding/server-element/server-element.component';
import { AssessmentDataBindingComponent } from './assessment-data-binding/assessment-data-binding.component';
import { GameControlComponent } from './assessment-data-binding/game-control/game-control.component';
import { OddComponent } from './assessment-data-binding/odd/odd.component';
import { EvenComponent } from './assessment-data-binding/even/even.component';
import { BasicHighlight } from './directives/basic-Highlight/basic-highlight.directive';
import { BetterhighlightDirective } from './directives/better-highlight/betterhighlight.directive';
import { UnlessDirectiveDirective } from './directives/unleess-directive/unless-directive.directive';
import { ServicesModuleComponent } from './services-module/services-module/services-module.component';
import { NewAccountComponent } from './services-module/services-module/new-account/new-account.component'
import {AccountComponent} from './services-module/services-module/account/account.component'
import { ServicesAssessmentComponent } from './Services-Assessment/services-assessment.component';
import { ActiveUsersComponent } from './Services-Assessment/active-users/active-users.component';
import { InactiveUsersComponent } from './Services-Assessment/inactive-users/inactive-users.component';
import { HomeComponent } from './routing-module/home/home.component';
import { ServersComponent } from './routing-module/servers/servers.component';
import { ServerComponent } from './routing-module/servers/server/server.component';
import { EditServerComponent } from './routing-module/servers/edit-server/edit-server.component';
import { UsersComponent } from './routing-module/users/users.component';
import { UserComponent } from './routing-module/users/user/user.component';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AppRoutingModule } from './app-routing.modulet';

import { ErrorPageComponent } from './error-page/error-page.component';

import { FormsComponent } from './forms/forms.component';
import { FormsAssessmentComponent } from './forms/forms-assessment/forms-assessment.component';
import { ReactiveFormsComponent } from './forms/reactive-forms/reactive-forms.component';
import { ReactiveFormsAssessmentComponent } from './forms/reactive-forms-assessment/reactive-forms-assessment.component';
import { PipesComponent } from './pipes/pipes.component';
import { ShortenPipe } from './Shared/shorten.pipe';
import { FilterPipe } from './Shared/filter.pipe';

import { ReversePipe } from './Shared/reverse.pipe';
import { SortPipe } from './sort.pipe';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import { recipesModule } from './recipes/recipes.module';
import { shoppingModule } from './ShoppingList/shoppingList.module';
import { sharedModule } from './Shared/shared.module';
import { coreModule } from './core.module';
import {StoreModule} from '@ngrx/store'
import { authModule } from './auth/auth.module';
import { LoggingService2 } from './logging.Service';
import { LoggingInteceptorService } from './Shared/loggingIntercepor.service';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { recipeResolver } from './recipes/recipe-resolver.service';
import { CanDeactivateGuard } from './routing-module/servers/edit-server/can-deactivate-guard.service';
import { serverResolver } from './routing-module/servers/server-resolver.service';
import { ServersService } from './routing-module/servers/servers.service';
import { AccountService } from './Shared/AccountService.service';
import { AuthInteceptorService } from './Shared/authInterceptor.service';
import { countService } from './Shared/countService.service';
import { LoggingService } from './Shared/logging.service';
import { recipeService } from './Shared/recipeService.service';
import { shoppingService } from './Shared/shoppingService.service';
import { UsersService } from './Shared/UsersServices.service';
import * as fromApp from 'src/app/Shared/store/app.reducer'
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './Shared/store/auth.effects';
import { environment } from 'src/environments/environment';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { RecipeEffects } from './recipes/store/recipe.effect';




@NgModule({
  declarations: [
    AppComponent,
    RootComponentComponent,
    HeaderComponentComponent,
    DatabindingComponent,
    CockpitComponent,
    ServerElementComponent,
    AssessmentDataBindingComponent,
    GameControlComponent,
    OddComponent,
    EvenComponent,
    BasicHighlight,
    BetterhighlightDirective,
    UnlessDirectiveDirective,
    ServicesModuleComponent,
    NewAccountComponent,
    AccountComponent,
    ServicesAssessmentComponent,
    ActiveUsersComponent,
    InactiveUsersComponent,
    HomeComponent,
    ServersComponent,
    ServerComponent,
    EditServerComponent,
    UsersComponent,
    UserComponent,
    PageNotFoundComponent,
    ErrorPageComponent,
    FormsComponent,
    FormsAssessmentComponent,
    ReactiveFormsComponent,
    ReactiveFormsAssessmentComponent,
    PipesComponent,
    ShortenPipe,
    FilterPipe,
    ReversePipe,
    SortPipe
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    EffectsModule.forRoot([AuthEffects, RecipeEffects]),
    sharedModule,
    StoreModule.forRoot(fromApp.appReducer),
    StoreDevtoolsModule.instrument({ logOnly: environment.production }),
    StoreRouterConnectingModule.forRoot(),
    coreModule,
    AppRoutingModule
  ],
  bootstrap: [AppComponent],
  providers: [AccountService, LoggingService, UsersService,countService, shoppingService, recipeService,ServersService, AuthService, AuthGuard, CanDeactivateGuard, serverResolver, recipeResolver,{provide: HTTP_INTERCEPTORS,useClass: AuthInteceptorService, multi:true},{provide: HTTP_INTERCEPTORS,useClass: LoggingInteceptorService, multi:true},LoggingService2],
})
export class AppModule { }
