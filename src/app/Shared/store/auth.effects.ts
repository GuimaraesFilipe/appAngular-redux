import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, Effect, ofType } from "@ngrx/effects";
import { stringify } from "querystring";
import { of, throwError } from "rxjs";
import { catchError, map, switchMap, tap } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { AuthProject } from "../auth-project.service";

import * as AuthActions from './auth.actions'
import { User } from "../../auth/user.model";
import { AuthService } from "src/app/auth.service";

export interface AuthResponseData {
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
  }
  

const handleAthentication = (expiresIn:number,email:string, userId:string, token:string) => {
    const expirationDate = new Date(
        new Date().getTime() + +expiresIn * 1000
    );
  const user = new User(email, userId, token, expirationDate);
  console.log('user from auto login', user)
    localStorage.setItem('userData', JSON.stringify(user));
      return new AuthActions.AuthenticateSuccess({
        email: email,
        userId: userId,
        token: token,
        expirationDate: expirationDate,
        redirect:true
      });
      
}
  
const handleErrror = (errorRes: any) => {
    let errorMessage = 'An unknown error occurred!';
    if (!errorRes.error || !errorRes.error.error) {
      return of(new AuthActions.AuthenticateFail(errorMessage));
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email exists already';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This email does not exist.';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'This password is not correct.';
        break;
    }
    return of(new AuthActions.AuthenticateFail(errorMessage));
      
}

  @Injectable()
  export class AuthEffects {
      
    
    @Effect()
    authSignup = this.actions$.pipe(
      ofType(AuthActions.SIGNUP_START),
      switchMap((signupAction: AuthActions.SignupStart) => {
        return this.http
          .post<AuthResponseData>(
            'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=' +
              environment.firebaseAPIKey,
            {
              email: signupAction.payload.email,
              password: signupAction.payload.password,
              returnSecureToken: true
            }
          )
          .pipe(
            tap(resData => {
              this.authService.setLogOutTimer(+resData.expiresIn * 1000);
            }),
            map(resData => {
              return handleAthentication(
                +resData.expiresIn,
                resData.email,
                resData.localId,
                resData.idToken
              );
            }),
            catchError(errorRes => {
              return handleErrror(errorRes);
            })
          );
      })
    );
  
    @Effect()
    authLogin = this.actions$.pipe(
      ofType(AuthActions.LOGIN_START),
      switchMap((authData: AuthActions.LoginStart) => {
        return this.http
          .post<AuthResponseData>(
            'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=' +
              environment.firebaseAPIKey,
            {
              email: authData.payload.email,
              password: authData.payload.password,
              returnSecureToken: true
            }
          )
          .pipe(
            tap(resData => {
              this.authService.setLogOutTimer(+resData.expiresIn * 1000);
            }),
            map(resData => {
              return handleAthentication(
                +resData.expiresIn,
                resData.email,
                resData.localId,
                resData.idToken
              );
            }),
            catchError(errorRes => {
              return handleErrror(errorRes);
            })
          );
      })
    );
  
    @Effect({ dispatch: false })
    authRedirect = this.actions$.pipe(
      ofType(AuthActions.AUTHENTICATE_SUCCESS),
      tap((AuthenticateSuccessAction: AuthActions.AuthenticateSuccess) => {
        if (AuthenticateSuccessAction.payload.redirect) {
          this.router.navigate(['/']);
        }
       
      })
    );
  
    @Effect()
    autoLogin = this.actions$.pipe(
      ofType(AuthActions.AUTO_LOGIN),
      map(() => {
        const userData: {
          email: string;
          id: string;
          _token: string;
          _tokenExpirationDate: string;
        } = JSON.parse(localStorage.getItem('userData'));
        if (!userData) {
          return { type: 'DUMMY' };
        }
  
        const loadedUser = new User(
          userData.email,
          userData.id,
          userData._token,
          new Date(userData._tokenExpirationDate)
        );
  
        if (loadedUser.token) {
          // this.user.next(loadedUser);
          const expirationDuration =
            new Date(userData._tokenExpirationDate).getTime() -
            new Date().getTime();
          this.authService.setLogOutTimer(expirationDuration);
          return new AuthActions.AuthenticateSuccess({
            email: loadedUser.email,
            userId: loadedUser.id,
            token: loadedUser.token,
            expirationDate: new Date(userData._tokenExpirationDate),
            redirect:false
          });
  
          // const expirationDuration =
          //   new Date(userData._tokenExpirationDate).getTime() -
          //   new Date().getTime();
          // this.autoLogout(expirationDuration);
        }
        return { type: 'DUMMY' };
      })
    );
  
    @Effect({ dispatch: false })
    authLogout = this.actions$.pipe(
      ofType(AuthActions.LOGOUT),
      tap(() => {
        this.authService.clearLogOutTimer();
        localStorage.removeItem('userData');
        this.router.navigate(['/auth']);
      })
    );
  
    constructor(
      private actions$: Actions,
      private http: HttpClient,
      private router: Router,
      private authService: AuthProject
    ) {}
  }
  