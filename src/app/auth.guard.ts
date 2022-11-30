import {  Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { map, take } from "rxjs/operators";
import { AuthProject } from "./Shared/auth-project.service";
import { Store } from "@ngrx/store";
import * as fromApp from './Shared/store/app.reducer'
@Injectable()
export class AuthGuard implements CanActivate{

    constructor(private authService: AuthProject, private router:Router, private store :Store<fromApp.AppState>) {
        
    }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean |  UrlTree> | boolean | UrlTree {
    return this.store.select('auth').pipe(
      take(1),// take one to make sure the application only subscribe to this token once
      map(authState => {
        return authState.user;
      }),
      map(user => {
        const isAuth = !!user;
        if (isAuth) {// if the user exists it will return true, if not it will return false
          console.log(' auth guard is returning trues')
          return true;
        }
        return this.router.createUrlTree(['./auth']);
      }))
  }
  // .then(
  //     (authenticated: boolean) => {
  //       if (authenticated) {
  //         return true;
  //       } else {
  //         this.router.navigate(['/']);
  //         return false;
  //       }
  //     }
  //   ) 
        
  //   }
  // canActivateChild(
  //   route: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean { 
  //   return this.canActivate(route,state)
  //   }
   
}