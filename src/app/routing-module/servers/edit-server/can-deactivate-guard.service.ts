import { CanDeactivate,ActivatedRoute, RouterStateSnapshot, ActivatedRouteSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";

export interface CanComponenteDeactivate{
    canDeactivate:() => Observable <boolean> | Promise<boolean> |boolean;

}

export class CanDeactivateGuard implements CanDeactivate<CanComponenteDeactivate>{
   
    canDeactivate(component: CanComponenteDeactivate,
        currentRouter: ActivatedRouteSnapshot,
        currentState: RouterStateSnapshot,
        nexState?: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean{
        return component.canDeactivate();
    }

}