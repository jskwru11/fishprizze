import { Injectable } from '@angular/core'
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { of } from 'rxjs';

import * as AuthActions from './auth.actions';
import { AuthService } from './../auth.service';
import { mergeMap, map, catchError, concatMap } from 'rxjs/operators';

@Injectable()
export class AuthEffect {
  constructor(
    private authService: AuthService,
    private actions$: Actions) {}

    login$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(AuthActions.loginUser),
        mergeMap(action => this.authService.login(action.user).pipe(
          map(userToken => AuthActions.loginUserSuccess({userToken}))
        )),
        catchError(error => of(AuthActions.loginUserFail({error})))
      )
    });

    signup$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(AuthActions.signupUser),
        concatMap(action => this.authService.signup(action.user).pipe(
          map(user => AuthActions.signupUserSuccess({user}))
        )),
        catchError(error => of(AuthActions.signupUserFail({error})))
      )
    })
}
