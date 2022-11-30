
import { HomeComponent } from './routing-module/home/home.component';
import { ServersComponent } from './routing-module/servers/servers.component';
import { ServerComponent } from './routing-module/servers/server/server.component';
import { EditServerComponent } from './routing-module/servers/edit-server/edit-server.component';
import { UsersComponent } from './routing-module/users/users.component';
import { UserComponent } from './routing-module/users/user/user.component';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { CanDeactivateGuard } from './routing-module/servers/edit-server/can-deactivate-guard.service';
import { ErrorPageComponent } from './error-page/error-page.component';
import { serverResolver } from './routing-module/servers/server-resolver.service';
import { DatabindingComponent } from './databinding/databinding.component';
import { AssessmentDataBindingComponent } from './assessment-data-binding/assessment-data-binding.component';
import { ServicesModuleComponent } from './services-module/services-module/services-module.component';
import { ServicesAssessmentComponent } from './Services-Assessment/services-assessment.component';
import { FormsComponent } from './forms/forms.component';
import { FormsAssessmentComponent } from './forms/forms-assessment/forms-assessment.component';
import { ReactiveFormsComponent } from './forms/reactive-forms/reactive-forms.component';
import { ReactiveFormsAssessmentComponent } from './forms/reactive-forms-assessment/reactive-forms-assessment.component';
import { PipesComponent } from './pipes/pipes.component'
import { HTTPrequestsComponent } from './httprequests/httprequests.component';


const appRoutes: Routes = [
  { path: '', redirectTo: '/recipeList', pathMatch: 'full' },
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.authModule) },
  { path: 'shoppingList', loadChildren: () => import('./ShoppingList/shoppingList.module').then(m => m.shoppingModule) },
  { path: 'recipeList', canActivate: [AuthGuard], loadChildren: () => import('./recipes/recipes.module').then(m => m.recipesModule) },
  
  {
    path: 'dataBinding', component: DatabindingComponent, children: [
      { path: 'dataBindingAss', component: AssessmentDataBindingComponent }
    ]
  },
  {
    path: 'routing', component: HomeComponent, children: [
      {
        path: 'users', component: UsersComponent,
        children: [
          { path: ':id/:name', component: UserComponent }]
      },
      {
        path: 'servers',
        // canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        component: ServersComponent,
        children: [
          { path: ':id', component: ServerComponent, resolve: { server: serverResolver } },
          { path: ':id/edit', component: EditServerComponent, canDeactivate: [CanDeactivateGuard] }]
      }
    ]
  },
  // { path: 'not-found', component: PageNotFoundComponent },
  {
    path: 'serviceModule', component: ServicesModuleComponent
  },
  { path: 'serviceAss', component: ServicesAssessmentComponent },
  {
    path: 'forms', component: FormsComponent, children: [
      { path: '', component: ReactiveFormsComponent }
     
    ]
  },
  { path: 'formsAssessment', component: FormsAssessmentComponent },
  { path: 'ReactiveformsAssessment', component: ReactiveFormsAssessmentComponent },
  { path: 'pipes', component: PipesComponent },
  { path: 'http', component: HTTPrequestsComponent },
  
  { path: 'not-found', component: ErrorPageComponent, data: { message: 'Page not found!' } },
  { path: '**', redirectTo: '/not-found' },
  
  
];

@NgModule({
    imports: [
       RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules, initialNavigation: 'enabledBlocking' })
    ],
    exports:[RouterModule]
   
    
})
export class AppRoutingModule{

}