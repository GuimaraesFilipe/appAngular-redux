import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Subject, throwError } from "rxjs";
import { catchError,tap } from "rxjs/operators";
import { User } from "../auth/user.model";
import * as fromApp from '../Shared/store/app.reducer'
import * as fromAuthActions from '../Shared/store/auth.actions'
import { environment } from "src/environments/environment";
import { Store } from "@ngrx/store";
// Everything that is commented has been changed in the application due to the use of NGRX

// export interface authResponse{
//     kind: string;
//     idToken: string;
//     email: string;
//     refreshToken: string;
//     expiresIn: string;
//     localId: string;
//     registered?: boolean;
// }

@Injectable({ providedIn: 'root' })
export class AuthProject{

    userSubject = new BehaviorSubject<User>(null); // behaviour subject  gives accces to the privous value as well. So in this case we can access the active user even after the user has been admitted 
    tokenExpTimer: any;

    constructor(private http: HttpClient, private router: Router, private store: Store<fromApp.AppState>) {
        
    }
    // signUp(email:string, password:string) {
    //    return this.http.post<authResponse>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='+ environment.firebaseAPIKey,
    //         {
    //             email: email,
    //             password: password,
    //             returnSecureToken: true
    //        }
    //    ).pipe(catchError(this.handleError),
    //        tap(resData => {
    //            this.handleAuth(
    //                resData.email,
    //                resData.localId,
    //                resData.idToken,
    //                +resData.expiresIn
    //            )
    //        })
    //    );
        
    // }
    // Login(email:string, password:string) {
    //     return this.http.post<authResponse>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='+ environment.firebaseAPIKey,
    //          {
    //              email: email,
    //              password: password,
    //              returnSecureToken: true
    //         }).pipe(catchError(this.handleError), tap(resData => {
    //             this.handleAuth(
    //                 resData.email,
    //                 resData.localId,
    //                 resData.idToken,
    //                 +resData.expiresIn
    //             )
    //         }));
    // }
    // logout() {
    //     this.userSubject.next(null);
    //     localStorage.removeItem('userData');
    //     if (this.tokenExpTimer) {
    //         clearTimeout(this.tokenExpTimer); // cleating the timer from the auto log out so if the user logs back in the system doesn't use the previous timer to log out
    //     }

        
    // }

    // autoLogin() {
    //     const userData: {
        
    //         email: string;
    //         id: string;
    //         _token: string;
    //         _tokenExpirationDate: string;
    //     } = JSON.parse(localStorage.getItem('userData'));// takes the string and transforms it back to JSON object
        
    //     if (!userData) {
    //         return; // check if there is an user in the browser local storage
    //     }
    
    //     const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));
    //     if (loadedUser.token) {
    //         this.store.dispatch(new fromAuthActions.AuthenticateSuccess({ email: loadedUser.email, userId: loadedUser.id, token:loadedUser.token, expirationDate: new Date(userData._tokenExpirationDate)} ))
    //         this.userSubject.next(loadedUser);// set the local storage user to the user subject so it can be passed to the application
    //         this.autoLogOut(new Date(userData._tokenExpirationDate).getTime()- new Date().getTime() * 1000); // setting the auto log out expiration duration so the user can be logged out
    //     }
    // }

    setLogOutTimer(expDuration: number) {
        console.log('exp time',expDuration) // getting token duration from server and then executing the logout method based on that
       this.tokenExpTimer= setTimeout(() => {
           this.store.dispatch(new fromAuthActions.Logout());
        }, expDuration);

    }

    clearLogOutTimer() {
        if (this.tokenExpTimer) {
            clearTimeout(this.tokenExpTimer);
            this.tokenExpTimer=null;
        }
    }
    
    // private handleError(errorRes: HttpErrorResponse) {
    //     let errorMessage = 'An unknown error occurred!';
    //     if (!errorRes.error || !errorRes.error.error) {
    //         return throwError(errorMessage);
    //     }
    //     switch (errorRes.error.error.message) {
    //         case 'EMAIL_EXISTS':
    //             errorMessage = 'This email exists already';
    //         case 'EMAIL_NOT-FOUND':
    //             errorMessage = 'This email not found.';
    //             case 'INVALID_PASSWORD':
    //                 errorMessage = 'Invalid password';
    //     }
    //     return throwError(errorMessage);
        
    // }

    // private handleAuth(email: string, userId:string, token: string, expiresIn: number) {
         
    //         const expDate= new Date(new Date().getTime() + expiresIn * 1000)
    //         const user = new User(email,userId, token, expDate);
    //     this.userSubject.next(user);
    //     this.autoLogOut(expiresIn * 1000); // setting the auto log out expiration duration so the user can be logged out
    //     localStorage.setItem('userData', JSON.stringify(user));
    //          console.log('user Authentication',user)
      
    // }
}