import { HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map, catchError,tap, take,exhaustMap } from "rxjs/operators";
import { AuthService } from "../auth.service";
import { AuthProject } from "./auth-project.service";
import { Store } from "@ngrx/store";
import * as fromApp from "./store/app.reducer";
@Injectable()

export class AuthInteceptorService implements HttpInterceptor {
    token: string = null;
    constructor(private auth: AuthProject, private store: Store<fromApp.AppState>){
            
    }
    
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        
        return this.store.select('auth').pipe(
            take(1), // Take operator takes one value and then unsubscribe
            map(authState => { 
                return authState.user;
            }),
            exhaustMap(user => {  // exaustMap operator uses the data from the preivous observable and replace it with the new observable 
                if (!user) {
                    return next.handle(req);
            }
            const modifyReq = req.clone({ params: new HttpParams().set('auth', user.token) }) //cloning the current HTTP request and adding the token to it
       
            return next.handle(modifyReq);
        }
            
        ));
        
        
    }

}